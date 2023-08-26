import { describe, expect, test } from '@jest/globals';
import { SudokuCracker } from '../SudokuCracker';
import { Sudoku } from '../Sudoku';

const createTestCase = (level: string) => test(level, () => {
    const sudoku = Sudoku.getSudokuFromFile(`./test/questions/${level}.txt`)
    const sudokuCracker = new SudokuCracker(sudoku)
    // console.log(`question:\n${sudoku.print()}`)
    sudokuCracker.execute();

    try {
        const answerSodoku = Sudoku.getSudokuFromFile(`./test/answers/${level}.txt`)
        expect(sudoku.print()).toBe(answerSodoku.print())
    } catch(e) {
        console.log(`unresolved answer:\n${sudoku.printVisualise()}`)
        throw e
    }
})

describe('SudokuCracker', () => {
    createTestCase('easy/level1')
    createTestCase('easy/level2')
    createTestCase('medium/level1')
})