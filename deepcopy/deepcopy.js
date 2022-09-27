//深拷贝  深度优先的列子
let obj = {
    node:'test1',
    data:{

    },
    props:{
        title:{
            type:'String'
        }
    },
    methods: {
        clickme(){
            alert('请点击我')
        }
    },
    children:[
        {
            node:'div',
            props:{
                
            }
        },
        {

        }
    ]
}

const deepcopy=(source)=>{
    let result = {}
    for (const key in source) {
        if(typeof source[key]=='object'){
            result[key] = deepcopy(source[key])
        }else if(typeof source[key]=='Array'){
            result[key] = []
            source[key].forEach(element => {
                result[key].push(deepcopy(element))
            });
        }else{
            result[key] = source[key]
        }
    }
    return result
}
let copyobject = deepcopy(obj)
console.log(copyobject)