const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const courses = require('./../database/schemas/course');
const enrollcandidates = require('./../database/schemas/enrollcandidates');

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
                if (!isExist) {
                    next();
                } else {
                    res.status(500).send({ error: 'course name is already present' });
                }
            }).catch(errorResponse => res.status(500).send(errorResponse));

    }, (req, res, next) => {
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

router.route('/enroll-candidate')
    .get((req, res, next) => {
        enrollcandidates.find({}, null, { lean: true }, (err, candidateList) => {
            if (err) {
                res.status(500).send(err);
            } else {
                req.mongoObj = candidateList;
                next();
            }
        });
    }, format_service_data)
    .post((req, res, next) => {
        const data = req.body;
        checkIfStudentExist(data)
            .then(isExist => {
                if (!isExist) {
                    next();
                } else {
                    const message = `Currently ${data.candidateName} is appearing the course in ${isExist.batchType} batch at ${sessionTimings}.`;
                    res.status(500).send({ error: message });
                }
            }).catch(errorResponse => res.status(500).send(errorResponse));

    }, (req, res, next) => {
        const data = {... req.body};
        const enroll = new enrollcandidates(data);
        enroll.save((err, doc) => {
            if (err) {
                res.status(500).send(err);
            } else {
                req.mongoObj = doc;
                next();
            }
        });
    }, format_service_data);


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
        const regex = "^" + data.name + "$";
        courses.findOne({ name: { $regex: regex, $options: "i" } }, null, { lean: true }, (err, course) => {
            if (err) {
                reject(err);
            } else {
                resolve(course);
            }
        });
    })
}

function checkIfStudentExist(data) {
    return new Promise((resolve, reject) => {
        const regex = "^" + data.candidateName + "$";
        const courseId = ObjectId(data.courseId);
        const match = {
            status: 'running',
            courseId: courseId,
            name: { $regex: regex, $options: "i" }
        };
        enrollcandidates.findOne(match, null, { lean: true }, (err, candidate) => {
            if (err) {
                reject(err);
            } else {
                resolve(candidate);
            }
        });
    })
}