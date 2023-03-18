const courses = require('../models/course');
const { success, error } = require('../handler/response');



module.exports = {

    createCourse: async (req, res) => {
        try {
            const course = await courses.findOne({ where: { name : req.body.name } });
            if (course !== null) throw "Course already exist";

            await courses.create({
                name: req.body.name,
                category: req.body.category,
                description: req.body.description,
                rating: req.body.rating,
                picture: 'https://anugrah.aenzt.tech/' + req.files[0].filename.replace(/ /g, '%20'),
                video1: 'https://anugrah.aenzt.tech/' + req.files[1].filename.replace(/ /g, '%20'),
                video2: 'https://anugrah.aenzt.tech/' + req.files[2].filename.replace(/ /g, '%20'),
                video3: 'https://anugrah.aenzt.tech/' + req.files[3].filename.replace(/ /g, '%20'),
                question1: req.body.question1,
                question2: req.body.question2,
                question3: req.body.question3,
                question4: req.body.question4,
                question5: req.body.question5,
            });

            return success(res, 200, true, "Course created successfully");
        }
        catch (err) {
            return error(res, 400, false, err);
        }
    },

    getCourseByID: async (req, res) => {
        try {
            const course = await courses.findOne({ where: { id: req.params['id'] } });
            if (course === null) throw "Course could not be found";

            return success(res, 200, true, "Course found successfully", course);
        }
        catch (err) {
            return error(res, 400, false, err);
        }
    },

    getCourseByCategory: async (req, res) => {
        try {
            const course = await courses.findAll({ where: { category: req.params['category'] }});
            if (course === null) throw "Course could not be found";

            return success(res, 200, true, "Course found successfully", course);
        }
        catch (err) {
            return error(res, 400, false, err);
        }
    },

    getAllCourse: async (req, res) => {
        try {
            const course = await courses.findAll();
            if (course === null) throw "No courses found";

            return success(res, 200, true, "Course found successfully", course);
        }
        catch (err) {
            return error(res, 400, false, err);
        }
    },

    updateCourse: async (req, res) => {
        try {
            const course = await courses.findOne({ where: { name : req.body.name } });
            if (course === null) throw "Course could not be found";

            await courses.update({
                name: req.body.name,
                category: req.body.category,
                description: req.body.description,
                rating: req.body.rating,
                picture: 'https://anugrah.aenzt.tech/' + req.files[0].filename.replace(/ /g, '%20'),
                video1: 'https://anugrah.aenzt.tech/' + req.files[1].filename.replace(/ /g, '%20'),
                video2: 'https://anugrah.aenzt.tech/' + req.files[2].filename.replace(/ /g, '%20'),
                video3: 'https://anugrah.aenzt.tech/' + req.files[3].filename.replace(/ /g, '%20'),
                question1: req.body.question1,
                question2: req.body.question2,
                question3: req.body.question3,
                question4: req.body.question4,
                question5: req.body.question5,
            });

            return success(res, 200, true, "Course updated successfully");
        }
        catch (err) {
            return error(res, 400, false, err);
        }
    },

    deleteCourseByID: async (req, res) => {
        try {
            const course = await courses.findOne({ where: { id: req.params['id'] } });
            if (course === null) throw "Course could not be found";

            await course.destroy();

            return success(res, 200, true, "Course has been deleted");
        }
        catch (err) {
            return error(res, 400, false, err);
        }
    },

    deleteAllCourse: async (req, res) => {
        try {
            await courses.sync({ force: true });

            return success(res, 200, true, "All courses has been deleted");
        }
        catch (err) {
            return error(res, 400, false, err);
        }
    },

    submitQuiz: async (req, res) => {
        try {
            const course = await courses.findOne({ where: { id: req.body.id } });
            if (course === null) throw "Course could not be found";

            const score = 0;
            if (req.body.answer1 === course.question1.answer) { score = score + course.question1.score}
            if (req.body.answer1 === course.question2.answer) { score = score + course.question2.score}
            if (req.body.answer1 === course.question3.answer) { score = score + course.question3.score}
            if (req.body.answer1 === course.question4.answer) { score = score + course.question4.score}
            if (req.body.answer1 === course.question5.answer) { score = score + course.question5.score}

            return success(res, 200, true, "Submission success", score)
        }
        catch (err) {
            return error(res, 400, false, err);
        }
    }
    
};