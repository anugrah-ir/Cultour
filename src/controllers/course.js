const courses = require('../models/course');
const { success, error } = require('../utils/response');

module.exports = {

    createCourse: async (req, res) => {
        try {
            await courses.create({
                name: req.body.name,
                category: req.body.category,
                province: req.body.province, 
                city: req.body.city,
                article: req.body.article,
                picture: req.body.picture,
                video: req.body.video,
                rating: 0
            });

            return success(res, 200, true, "Course created successfully");
        }
        catch (err) {
            return error(res, 500, false, err);
        }
    },

    getCourse: async (req, res) => {
        try {
            const course = await courses.findOne({ where: { name : req.body.name } });
            if (course !== null) {
                return success(res, 200, true, "Course found successfully", course);
            }
            else {
                return error(res, 400, false, "Course could not be found");
            }
        }
        catch (err) {
            return error(res, 500, false, err);
        }
    },

    updateCourse: async (req, res) => {
        try {
            const course = await courses.findOne({ where: { name : req.body.name } });

            if (course !== null) {
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
            else {
                return error(res, 400, false, "Course could not be found");
            }
        }
        catch (err) {
            return error(res, 500, false, err);
        }
    },

    deleteCourse: async (req, res) => {
        try {
            const course = await courses.findOne({ where: { name : req.body.name } });

            if (course != null) {
                await course.destroy();

                return success(res, 200, true, "Course has been deleted");
            }
            else {
                return error(res, 400, false, "Course could not be found");
            }
        }
        catch (err) {
            return error(res, 500, false, err);
        }
    }

};