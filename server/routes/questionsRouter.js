const express = require('express');
const cachedQuestions = require('../data/questions.json');

const itemRouter = express.Router();

/**
 * Return all questions excluding their correct answers.
 */
const getQuestions = function (cachedQuestions) {
    return cachedQuestions.map((question) => {
        return {
            id: question.id,
            question: question.question,
            choices: question.choices
        }
    });
};

itemRouter.get('/get', (req, res) => {
    const questions = getQuestions(cachedQuestions);
    res.status(200).json(questions);
});

module.exports = itemRouter;
