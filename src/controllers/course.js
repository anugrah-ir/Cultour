const courses = require('../models/course');
const { success, error } = require('../utils/response');



module.exports = {

    createCourse: async (req, res) => {
        try {
            if (!req.files || req.files.length === 0) throw "No files uploaded";
            
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
                video3: 'https://anugrah.aenzt.tech/' + req.files[3].filename.replace(/ /g, '%20')
            });

            return success(res, 200, true, "Course created successfully");
        }
        catch (err) {
            return error(res, 400, false, err);
        }
    },

    getCourse: async (req, res) => {
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

            await course.update({
                name: req.body.name,
                category: req.body.category,
                province: req.body.province, 
                city: req.body.city,
                article: req.body.article,
                picture: req.body.picture,
                video: req.body.video,
                rating: 0
            });

            return success(res, 200, true, "Course updated successfully");
        }
        catch (err) {
            return error(res, 400, false, err);
        }
    },

    deleteCourse: async (req, res) => {
        try {
            const course = await courses.findOne({ where: { name : req.body.name } });
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
    }

};