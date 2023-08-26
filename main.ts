import { Sudoku } from "./Sudoku";
import { SudokuCracker } from "./SudokuCracker";

const sudoku = Sudoku.getSudokuFromFile('./input.txt')

console.log('Original sudoku')
sudoku.print()
console.log('\n\n')

const sudokuCracker = new SudokuCracker(sudoku)
sudokuCracker.execute()


console.log('Solved sudoku')
sudoku.print()


