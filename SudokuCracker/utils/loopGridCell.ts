export type LoopGridCellCallback = (args: { gridCellRowIndex: number, gridCellColumnIndex: number }) => void


export const loopGridCell = (callback: LoopGridCellCallback) => {
    for (let gridCellRowIndex = 0; gridCellRowIndex < 3; ++gridCellRowIndex) {
        for (let gridCellColumnIndex = 0; gridCellColumnIndex < 3; ++gridCellColumnIndex) {
            callback({ gridCellRowIndex, gridCellColumnIndex })
        }
    }

}