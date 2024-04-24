import { encoded, translations } from './data.js'

const decoded = (encoded, translations) => {
  let resValues = encoded.map((el) => {
    return Object.values(el)
  })
  let resKeys = encoded.map((el) => {
    return Object.keys(el)
  })

  //   id элементов удовлетворяющих условию задачи
  let resElemWidthId = resKeys
    .map((el) => {
      return el.map((elem, id) =>
        elem.indexOf('Id') === -1 || elem.indexOf('groupId') !== -1 ? false : id
      )
    })
    .map((el) => el.filter((elem) => Boolean(elem)))

  //  id элементов не удовлетворяющих условию задачи
  let resElemNo = resKeys
    .map((el) => {
      return el.map((elem, id) =>
        elem.indexOf('Id') === -1 || elem.indexOf('groupId') !== -1 ? id : false
      )
    })
    .map((el) => el.filter((elem) => elem !== false))

  // массивы ключей и значений элементов не удовлетворяющих условию задачи
  let keysElNo = []
  let valuesElNo = []

  for (let i = 0; i < resElemNo.length; i++) {
    // ключи и значения элементов не удовлетворяющих условию задачи
    let keysNo = []
    let valuesNo = []
    for (let r = 0; r < resElemNo[i].length; r++) {
      valuesNo.push(resValues[i][resElemNo[i][r]])
      keysNo.push(resKeys[i][resElemNo[i][r]])
    }
    valuesElNo.push(valuesNo)
    keysElNo.push(keysNo)
  }

  //  Массивы расшифрованных ключeй и их значений (без уникальных)
  let resTransKeys = []
  let resTransValues = []

  //  Массивы расшифрованных ключeй и их значений (уникальныe)
  let uniqueKeys = []
  let uniqueValue = []

  for (let i = 0; i < resElemWidthId.length; i++) {
    // Расшифрованные ключи и их значения (без уникальных)
    let translateKeys = []
    let translateValues = []

    // Расшифрованные ключи и их значения (уникальныe)
    let keysUndefined = []
    let valuesUndefined = []

    for (let r = 0; r < resElemWidthId[i].length; r++) {
      let itemTranslate = translations[resValues[i][resElemWidthId[i][r]]]
      if (itemTranslate === undefined) {
        keysUndefined.push(resKeys[i][resElemWidthId[i][r]])
        valuesUndefined.push(resValues[i][resElemWidthId[i][r]])
      } else {
        translateKeys.push(resKeys[i][resElemWidthId[i][r]])
        translateValues.push(itemTranslate)
      }
    }
    uniqueKeys.push(keysUndefined)
    uniqueValue.push(valuesUndefined)

    resTransKeys.push(translateKeys)
    resTransValues.push(translateValues)
  }

  //   Итоговый массив с объектами и расшифрованными значениями
  let resultArray = []

  for (let i = 0; i < resTransKeys.length; i++) {
    let resObj = {}
    for (let r = 0; r < resTransKeys[i].length; r++) {
      let key = resTransKeys[i][r]
      let values = resTransValues[i][r]
      resObj[key] = values
    }

    let resObjUndefined = {}
    for (let r = 0; r < uniqueKeys[i].length; r++) {
      let key = uniqueKeys[i][r]
      let values = uniqueValue[i][r]
      resObjUndefined[key] = values
    }

    let resObjNo = {}
    for (let r = 0; r < keysElNo[i].length; r++) {
      let key = keysElNo[i][r]
      let values = valuesElNo[i][r]
      resObjNo[key] = values
    }

    let resultObj = Object.assign(resObj, resObjUndefined, resObjNo)
    resultArray.push(resultObj)
  }

  //   Итоговый массив с объектами и уникальными значениями
  let resTransUndefined = []
  for (let i = 0; i < uniqueKeys.length; i++) {
    let resObj = {}
    for (let r = 0; r < uniqueKeys[i].length; r++) {
      let key = uniqueKeys[i][r]
      let values = uniqueValue[i][r]
      resObj[key] = values
    }
    resTransUndefined.push(resObj)
  }

  return { result: resultArray, unique: resTransUndefined }
}
console.log("Let's rock")
console.log(decoded(encoded, translations))
