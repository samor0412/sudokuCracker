import { Sudoku } from "../../../Sudoku";
import { NUMBER_SET } from "../../constants";
import { loopGridCell } from "../../utils/loopGridCell";

export const checkRemainingNumber = ({ sudoku, gridRowIndex, gridColumnIndex }: { sudoku: Sudoku, gridRowIndex: number, gridColumnIndex: number }) => {
    for (let targetNumber of NUMBER_SET) {
        const allowResult: Record<string, boolean> = {};
        loopGridCell(({ gridCellRowIndex, gridCellColumnIndex }) => {
            const cell = sudoku.read(gridCellRowIndex, gridCellColumnIndex)
            const rowIndex = gridRowIndex * 3 + gridCellRowIndex;
            const columnIndex = gridColumnIndex * 3 + gridCellColumnIndex;

            if (cell != Sudoku.EMPTY) {
                allowResult[`${rowIndex},${columnIndex}`] = false;
            } else {
                const { rowAdjacentCells, columnAdjacentCells, gridAdjacentCells } = sudoku.getCellAdjacent(rowIndex, columnIndex)
                const abandonedNumberSet = new Set([...rowAdjacentCells, ...columnAdjacentCells, ...gridAdjacentCells,])
                allowResult[`${rowIndex},${columnIndex}`] = !abandonedNumberSet.has(targetNumber)
            }
        })

        if (Object.values(allowResult).filter(res => res).length === 1) {
            const [coordinateKey] = Object.entries(allowResult).filter(([_, value]) => !!value)[0]
            const [rowIndex, columnIndex] = coordinateKey.split(',')
            sudoku.write(parseInt(rowIndex), parseInt(columnIndex), targetNumber)
        }
    }

}