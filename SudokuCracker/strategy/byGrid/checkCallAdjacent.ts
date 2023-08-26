import { Sudoku } from "../../../Sudoku";
import { NUMBER_SET } from "../../constants";

export const checkCellAdjacent = ({ sudoku, rowIndex, columnIndex }: { sudoku:Sudoku, rowIndex: number, columnIndex: number }) => {
    const { rowAdjacentCells, columnAdjacentCells, gridAdjacentCells } = sudoku.getCellAdjacent(rowIndex, columnIndex)
    const numberSet = new Set(NUMBER_SET);
    rowAdjacentCells.forEach(cell => numberSet.delete(cell))
    columnAdjacentCells.forEach(cell => numberSet.delete(cell))
    gridAdjacentCells.forEach(cell => numberSet.delete(cell))

    if (numberSet.size === 1) {
        const [target] = numberSet
        sudoku.write(rowIndex, columnIndex, target)
    }
}