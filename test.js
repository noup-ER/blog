
let a = [];
let g = 1
Object.defineProperty(a,"key",{
    enumerable:false,
    configable:true,
    get(){
        console.log("触发了getter");
        return g
    },
    set(newvalue){
        g = newvalue
    }
})


class obs{
    name;
    constructor(value) {
        this.name = value
    }
}

const temp = new obs("abcdd")
console.log(temp);