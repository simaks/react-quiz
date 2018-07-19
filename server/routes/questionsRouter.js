const express = require('express');
const cachedQuestions = require('../data/questions.json');

const questionsRouter = express.Router();

questionsRouter.get('/get', (req, res) => {
    const questions = getQuestions(cachedQuestions);
    res.status(200).json(questions);
});

questionsRouter.post('/check', (req, res) => {
    res.status(200).json(checkAnswers(cachedQuestions, req.body.answers));
});

/**
 * Return all questions excluding their correct answers.
 * @param {{ id: string, question: string, choices: string[], correctAnswer: number }[]} questions 
 */
const getQuestions = function (questions) {
    return questions.map((question) => {
        return {
            id: question.id,
            question: question.question,
            choices: question.choices
        }
    });
};

/**
 * Calculate quiz results by given answers and questions with correct answers
 * @param {{ id: string, question: string, choices: string[], correctAnswer: number }[]} questions 
 * @param {{ questionId: string, answer: number }[]} answers
 * @returns {{ correct: number, wrong: number, skipped: number }}
 */
const checkAnswers = function (questions, answers) {
    let correct = 0;
    let wrong = 0;
    for (let answer of answers) {
        const question = questions.find(q => q.id === answer.questionId);
        question.correctAnswer === answer.answer ? correct++ : wrong++;
    }
    return {
        correct,
        wrong,
        skipped: cachedQuestions.length - answers.length,
    }
};

module.exports = questionsRouter;
