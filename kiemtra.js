
let thu = () =>{
    let string = 'giuong: 2 giuong, tu: 2 tu, dien tich: 50 m2';
    let ItemSummary = string.split(',');
    let arr =[];
    ItemSummary.map((item, index) =>{            
        let arrtmp = item.split(':');
        let str = `{"${arrtmp[0]}":"${arrtmp[1]}"}`;
        
        arr.push(JSON.parse(str));
    });

    //console.log(arr)

    let string1 = '';
    arr.map(( item, index) =>{
        //console.log(item)
        string1 += JSON.stringify(item);
    })
    //console.log(string1)
}


module.exports = {
    thu
}


// [ { giuong: ' 2 giuong' },
//   { ' tu': ' 2 tu' },
//   { ' dien tich': ' 50 m2' } ]
