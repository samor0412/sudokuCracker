export type LoopGridCallback = (args: { gridRowIndex: number, gridColumnIndex: number, rowIndex: number, columnIndex: number }) => void

export const loopGrid = (callback: LoopGridCallback) => {
    for (let gridRowIndex = 0; gridRowIndex < 3; ++gridRowIndex) {
        for (let gridColumnIndex = 0; gridColumnIndex < 3; ++gridColumnIndex) {
            for (let gridI = 0; gridI < 3; ++gridI) {
                for (let gridJ = 0; gridJ < 3; ++gridJ) {
                    const rowIndex = gridRowIndex * 3 + gridI;
                    const columnIndex = gridColumnIndex * 3 + gridJ;
                    callback({ gridRowIndex, gridColumnIndex, rowIndex, columnIndex })
                }
            }
        }
    }
}