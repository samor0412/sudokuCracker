import { loopGridCell } from "./loopGridCell"

export type LoopGridCallback = (args: { gridRowIndex: number, gridColumnIndex: number }) => void
export type LoopGridCellCallback = (args: { gridRowIndex: number, gridColumnIndex: number, rowIndex: number, columnIndex: number }) => void

interface Args {
    loopGridCallback: LoopGridCallback
    loopGridCellCallback: LoopGridCellCallback
}
export const loopGrid = ({ loopGridCallback, loopGridCellCallback }: Args) => {
    for (let gridRowIndex = 0; gridRowIndex < 3; ++gridRowIndex) {
        for (let gridColumnIndex = 0; gridColumnIndex < 3; ++gridColumnIndex) {

            loopGridCallback({ gridRowIndex, gridColumnIndex })

            loopGridCell(({gridCellRowIndex, gridCellColumnIndex}) => {
                const rowIndex = gridRowIndex * 3 + gridCellRowIndex;
                const columnIndex = gridColumnIndex * 3 + gridCellColumnIndex;
                loopGridCellCallback({ gridRowIndex, gridColumnIndex, rowIndex, columnIndex })
            })
        }
    }
}