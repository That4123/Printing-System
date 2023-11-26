module.export = class PrintRequest{
    fileName;
    pathToUploadFile;
    chosenPrinter;
    paperSize;
    pagesToPrint;
    isDoubleSide;
    numberOfCopies;
    printType;
    constructor(fileName,
        pathToUploadFile,
        chosenPrinter,
        paperSize,
        pagesToPrint,
        isDoubleSide,
        numberOfCopies,
        printType){
            this.fileName = fileName;
            this.pathToUploadFile = pathToUploadFile;
            this.chosenPrinter = chosenPrinter; 
            this.paperSize = paperSize;
            this.pagesToPrint = pagesToPrint;
            this.isDoubleSide = isDoubleSide;
            this.numberOfCopies = numberOfCopies;
            this.printType = printType
    }
}