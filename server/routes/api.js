const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const courses = require('./../database/schemas/course');

/* GET services listing. */
router.get('/', function (req, res, next) {
    res.json({ users: [{ name: 'Timmy' }] });
});

router.route('/courses')
    .get((req, res, next) => {
        courses.find({}, null, { lean: true }, (err, courseList) => {
            if (err) {
                res.status(500).send(err);
            } else {
                req.mongoObj = courseList;
                next();
            }
        });
    }, format_service_data)
    .post((req, res, next) => {
        const data = req.body;
        findCourse(data)
        .then(isExist => {
            if(!isExist) {
                next();
            } else {
                res.status(500).send({error: 'course name is already present'});
            }
        }).catch(errorResponse => res.status(500).send(errorResponse));

    },(req, res, next) => {
        const data = req.body;
        const course = new courses(data);
        course.save((err, doc) => {
            if (err) {
                res.status(500).send(err);
            } else {
                req.mongoObj = doc;
                next();
            }
        });
    }, format_service_data);

router.route('/courses/:cId')
    .delete((req, res, next) => {
        const courseId = req.params && req.params.cId || '';
        let query;
        if (courseId) {
            if (courseId !== 'all') {
                query = { _id: ObjectId(courseId) };
            }
            if (courseId === 'all') {
                query = {};
            }
            req.dQry = query;
            next();
        } else {
            res.json({ description: 'params are not valid' });
        }
    }, (req, res) => {
        const query = req.dQry || ''
        query && courses.remove(query, (err, doc) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json({
                action: req.params.sId === 'all' ? 'DELETED ALL RECORDS' : 'DELETED'
            });
        }) || res.json({ description: 'params are not valid' });
    });

module.exports = router;

function format_service_data(req, res, next) {
    const serviceData = req.mongoObj || '';
    const proceedToNext = req.proceedToNext || false;
    let result;

    if (serviceData) {
        if (typeof serviceData === 'object' && Array.isArray(serviceData) && serviceData.length) {
            const list = serviceData.map((obj) => {
                delete obj.__v;
                return obj;
            });
            result = list;
        } else {
            delete serviceData.__v;
            result = serviceData;
        }
    }

    if (proceedToNext) {
        req.mongoObj = result;
        next();
    } else if (result) {
        res.json(result);
    } else {
        res.status(500).send("Something went wrong !");
    }
}

function findCourse(data) {
    return new Promise((resolve, reject) => {
        const regex = "^"+data.name+"$";
        courses.findOne({name: {$regex: regex, $options: "i"}}, null, { lean: true }, (err, course) => {
            if (err) {
                reject(err);
            } else {
                resolve(course);
            }
        });
    })
}