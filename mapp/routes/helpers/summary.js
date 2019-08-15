

const getSummary = (string = '')=> {
    if(string === '') return [];
    
    let ItemSummary = string.split(',');
    let arr =[];
    ItemSummary.map((item, index) =>{            
        let arrtmp = item.split(':');
        let str = `{"${arrtmp[0]}":"${arrtmp[1]}"}`;        
        arr.push(JSON.parse(str));
    });
	return arr;
};

module.exports = {
    getSummary
}