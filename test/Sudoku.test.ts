import { describe, expect, test } from '@jest/globals';
import { Sudoku } from '../Sudoku';

const correctDimension = [
    [3, 5, 4, 8, 2, 7, 1, 6, 9],
    [1, 6, 7, 3, 4, 9, 8, 2, 5],
    [9, 2, 8, 5, 1, 6, 4, 7, 3],
    [5, 8, 9, 7, 3, 2, 6, 1, 4],
    [4, 7, 6, 9, 8, 1, 5, 3, 2],
    [2, 3, 1, 6, 5, 4, 9, 8, 7],
    [8, 9, 2, 4, 6, 3, 7, 5, 1],
    [7, 1, 5, 2, 9, 8, 3, 4, 6],
    [6, 4, 3, 1, 7, 5, 2, 9, 8]
]

const wrongDimension = [
    [3, 3, 4, 8, 2, 7, 1, 6, 9],
    [1, 6, 7, 3, 4, 9, 8, 2, 5],
    [9, 2, 8, 5, 1, 6, 4, 7, 3],
    [5, 8, 9, 7, 3, 2, 6, 1, 4],
    [4, 7, 6, 9, 8, 1, 5, 3, 2],
    [2, 3, 1, 6, 5, 4, 9, 8, 7],
    [8, 9, 2, 4, 6, 3, 7, 5, 1],
    [7, 1, 5, 2, 9, 8, 3, 4, 6],
    [6, 4, 3, 1, 7, 5, 2, 9, 8]
]

const emptyDimension = [
    [3, 5, 4, 8, 2, 7, 1, 6, 9],
    [0, 6, 7, 3, 4, 9, 8, 2, 5],
    [9, 2, 8, 5, 1, 6, 4, 7, 3],
    [5, 8, 9, 7, 3, 2, 6, 1, 4],
    [4, 7, 6, 9, 8, 1, 5, 3, 2],
    [2, 3, 1, 6, 5, 4, 9, 8, 7],
    [8, 9, 2, 4, 6, 3, 7, 5, 1],
    [7, 1, 5, 2, 9, 8, 3, 4, 6],
    [6, 4, 3, 1, 7, 5, 2, 9, 8]
]

describe('Sudoku', () => {
    test('getSudokuFromFile', () => {
        const sudoku = Sudoku.getSudokuFromFile('./input.test.txt')
        expect(sudoku.read(0, 8)).toBe(9)
        expect(sudoku.print()).toBe(
            `3,5,4,8,2,7,1,6,9
1,6,7,3,4,9,8,2,5
9,2,8,5,1,6,4,7,3
5,8,9,7,3,2,6,1,4
4,7,6,9,8,1,5,3,2
2,3,1,6,5,4,9,8,7
8,9,2,4,6,3,7,5,1
7,1,5,2,9,8,3,4,6
6,4,3,1,7,5,2,9,8`)
    })
    test('getCellAdjacent', () => {
        const sudoku = new Sudoku(correctDimension)
        expect(sudoku.getCellAdjacent(4, 0)).toStrictEqual({
            rowAdjacentCells: [7, 6, 9, 8, 1, 5, 3, 2],
            columnAdjacentCells: [3, 1, 9, 5, 2, 8, 7, 6],
            gridAdjacentCells: [5, 8, 9, 7, 6, 2, 3, 1],
        })
    })
    test('isCorrect', () => {
        let sudoku = new Sudoku(correctDimension)
        expect(sudoku.isCorrect()).toBeTruthy();
        sudoku = new Sudoku(wrongDimension)
        expect(sudoku.isCorrect()).toBeFalsy();
    })
    test('isCompleted', () => {
        let sudoku = new Sudoku(correctDimension)
        expect(sudoku.isCompleted()).toBeTruthy();
        sudoku = new Sudoku(emptyDimension)
        expect(sudoku.isCompleted()).toBeFalsy();
    })
})