module.export = class PrintRequest{
    fileName;
    pathToUploadFile;
    chosenPrinter;
    paperSize;
    pagesToPrint;
    isDoubleSize;
    numberOfCopies;
    constructor(fileName,
        pathToUploadFile,
        chosenPrinter,
        paperSize,
        pagesToPrint,
        isDoubleSize,
        numberOfCopies){
            this.fileName = fileName;
            this.pathToUploadFile = pathToUploadFile;
            this.chosenPrinter = chosenPrinter; 
            this.paperSize = paperSize;
            this.pagesToPrint = pagesToPrint;
            this.isDoubleSize = isDoubleSize;
            this.numberOfCopies = numberOfCopies;
    }
}