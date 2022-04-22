const emailEnding = "@xxx.xyz"
const EnumTest = {
  strings:{
    emptyString: "",
    simpleString: "asdasd",
    stringWithNumber: "sadas123",
    whiteSpaceString: "   ",
    whiteSpaceStringLeft: "   aksdj",
    whiteSpaceStringRight: "asdas   ",
    whiteSpaceStringMiddle: "asdas asdasd",
    stringSpecialChar: "asd@`asdaá",
  },
  numbers:{
    intNumber: 1,
    floatNumber: 1.4,
  },
  nullable:{
    nullChar: null,
  },
  lists:{
    emptyList: [],
  },
  objects: {
    emptyObject: {},
  },
  emails:{
    correctEnding: {
      emptyString: this.emptyString + emailEnding,
      intNumber: this.intNumber + emailEnding,
      floatNumber: this.floatNumber + emailEnding,
      simpleString: this.simpleString + emailEnding,
      whiteSpaceString: this.whiteSpaceString + emailEnding,
      whiteSpaceStringLeft: this.whiteSpaceString + emailEnding,
      whiteSpaceStringMiddle: this.whiteSpaceStringMiddle + emailEnding,
      nullEmail: null,
      stringSpecialChar: this.stringSpecialChar + emailEnding,
    }
  },
  passwords:{
    lessThanSixChar: '01234',
    sixChar: '012345',
    lessThanEightChar: '0123456',
    eightChar: '01234567',
    moreThanEightChar: '0123456789',
    specialCaseNumEight: 'Ab34567@',
    specialCaseNumLessEight: 'Ab3456@',
    specialNumEight: 'ab34567@',
    caseNumEight: 'Ab345678',
    specialCaseEight: 'Abcdefg@',
  }
}


module.exports = EnumTest;