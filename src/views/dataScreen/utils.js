// 初始化数据
export function initData(data,type,unit, typeValue='', age, sex) {
    let list = data || []
    if(!list && !Array.isArray(list)) return null
    let result
    switch(type){
    case 'value':
        if(!list[0]?.measureData && typeof list[0]?.measureData !== 'number' && typeValue !== '血压') {
            result = ''
        } else {
            switch(typeValue) {
                case '血氧':
                    result = list[0]?.measureData*1
                    break
                case '血压':
                    result = !list[0]?.bpSp && !list[0]?.bpDp  ? '' :   list[0]?.bpSp + '/' + list[0]?.bpDp 
                    break
                default:
                    result = list[0]?.measureData
                    break
            }
        }
        break;
    case 'time':
        result = list[0]?.meatime || ''
        break;
    case 'unit':
        result = list.length > 0 ? unit : '------'
        break;
    case 'historyList':
        result = list.map(item => {
            item.unit = unit
            item.handleType = getTypeValue(item, typeValue,age, sex)
            if(typeValue == '血氧') {
                item.measureData = item.measureData * 1
            }
            if(typeValue == '血压') {
                item.measureData = item.bpSp + '/' + item.bpDp
            }
            return item
        })
        break;
    default:
    }
    return result
}

// 获取数据所属的Ai小助手类型
export function getTypeValue(data, type, age, sex) {
    if(!data) return ''
    let result
    switch(type) {
        case '心率':
            if(!data.measureData && typeof data.measureData !== 'number') {
                result = ''
                break
            }
            if(data.age <= 60) {
                if(data.measureData < 60) result = '心率（心率过慢）'
                if(60 <= data.measureData && data.measureData <= 100) result = '心率（心率正常）'
                if(data.measureData > 100) result = '心率（心率过速）'
            } else {
                if(data.measureData < 50) result = '心率（心率过慢）'
                if(50 <= data.measureData && data.measureData <= 80) result = '心率（心率正常）'
                if(data.measureData > 80) result = '心率（心率过速）'
            }
            break;
        case '血氧':
            if(!data.measureData && typeof data.measureData !== 'number') {
                result = ''
                break
            }
            let measureData = data.measureData * 1
            if(94 < measureData && measureData <= 99) result = '血氧（血氧正常）'
            if(90 <= measureData && measureData <= 94) result = '血氧（供氧不足）'
            if(80 <= measureData && measureData < 90) result = '血氧（低氧血症）'
            if(measureData < 80) result = '血氧（重度低氧血症）'
            break;
         case '血压':
            if(!data.bpSp && typeof data.bpSp !== 'number' || !data.bpDp && typeof data.bpDp !== 'number') {
                result = ''
                break
            }
            if(data.bpSp >= 180 || data.bpDp>= 110) result = '血压（重度高血压）'
            if(160 <= data.bpSp && data.bpSp <= 179 || 100 <= data.bpDp && data.bpDp <= 109) result = '血压（中度高血压）'
            if(140 <= data.bpSp && data.bpSp <= 159 || 90 <= data.bpDp && data.bpDp <= 99) result = '血压（轻度高血压）'
            if(data.bpSp < 90 && data.bpDp < 60) result = '血压（低血压）'
            if(120 <= data.bpSp && data.bpSp <= 139 || 80 <= data.bpDp && data.bpDp <= 89) result = '血压（正常高值）'
            if(90 <= data.bpSp && data.bpSp <= 120 || 60 <= data.bpDp && data.bpDp <= 80) result = '血压（正常血压）'
            break;
        case '血糖':
            if(!data.physicalstate || !data.measureData && typeof data.measureData !== 'number') {
                result = ''
                break
            }
            // 空腹
            if(data.physicalstate == 0) {
                if(data.measureData < 3.9) result = '血糖（低血糖值）'
                if(3.9<= data.measureData && data.measureData < 6.1) result = '血糖（正常血糖值）'
                if(6.1<= data.measureData && data.measureData < 7.0) result = '血糖（灰色地带）'
                if(7.0<= data.measureData) result = '血糖（糖尿病）'
            } else {
                if(data.measureData < 7.8) result = '血糖（正常血糖值）'
                if(7.8<= data.measureData && data.measureData < 11.1) result = '血糖（灰色地带）'
                if(11.1<= data.measureData) result = '血糖（糖尿病）'
            }
            break
        case '尿酸':
            if(!age || (!data.measureData && typeof data.measureData !== 'number') || !sex) {
                result = ''
                break
            }
            result = '尿酸（尿酸值异常）'
            if(age < 12 && 150 < data.measureData && data.measureData < 333)  result = '尿酸（尿酸值正常）'
            if(age >= 12 && sex == '男' && 200 < data.measureData && data.measureData < 420) result = '尿酸（尿酸值正常）'
            if(age >= 12 && sex == '女' && 140 < data.measureData && data.measureData < 360) result = '尿酸（尿酸值正常）'
            break
        case '胆固醇':
            if(!data.measureData && typeof data.measureData !== 'number') {
                result = ''
                break
            }
            result = data.measureData < 5.17 ? '胆固醇（正常）' : '胆固醇（胆固醇偏高）'
            break
        default:
            result = ''
    }

    return result

}


