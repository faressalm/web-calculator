const appUrl = "http://localhost:8090/api";
const app = Vue.createApp({
    data() {
        return {
            numberstr:"",
            operation:"",
            result:"",
            lastnum:"0",
            lastoper:"+",
            
         }
    },
    methods: {
        addnum(num) {this.checkerror(this.result);
            !this.numberstr.localeCompare("0")&&num.localeCompare(".")?this.numberstr="":this.numberstr;
            if(this.operation.length==0){
                this.result="";
            }
            if((!num.localeCompare(".")&&this.numberstr.indexOf('.') > -1)||this.numberstr.length==33){
            }else{
                !num.localeCompare(".")&&!this.numberstr.localeCompare("0")?this.numberstr="0.":
                this.numberstr += num;
            }
            
        },
        clearNum(){this.checkerror(this.result);
            var str =this.numberstr.substring(0,this.numberstr.length-1);
            this.numberstr=str;
            this.numberstr=="-0"?this.numberstr="0":this.numberstr;
            this.numberstr=="-"?this.numberstr="":this.numberstr;
        },
        CE(){ 
            this.result="";
            this.numberstr="";
            this.operation="";
        },
        C(){
            this.CE();
            this.lastoper="+";
            this.lastnum="0";
        },
        setOper(oper){
            this.checkerror(this.result);
            if(this.result.length==0){
                this.numberstr.length==0?this.result="0":this.result=this.numberstr;
                this.numberstr="";
            }
            if(this.operation.length!=0&&this.numberstr.length!=0)
            {this.equalres(oper);
                
            }
            
            this.operation=oper;
        },
        
        equalres(oper){
           this.checkerror(this.result);
           
            if(this.result.length==0){
                this.operation=this.lastoper;
                this.numberstr.length==0?this.result="0":this.result=this.numberstr;
                this.numberstr=this.lastnum;
            }else if(this.result.length!=0&&this.operation.length==0){
                this.operation=this.lastoper;
                this.numberstr=this.lastnum;
            }else if(this.numberstr.length==0){
                this.numberstr=this.result;
                this.lastoper=this.operation;
                this.lastnum=this.numberstr;
            }else{
                this.lastnum=this.numberstr;
                this.lastoper=this.operation;
            }
        
            axios.get(appUrl+'/twoOper',{
                params :{
                    result:this.result,
                    operation : this.operation,
                    number : this.numberstr
                  
                }
              })
              .then(response => {
                  this.CE();
                if(oper.length!=0){
                    this.operation=oper;
                    this.lastoper=oper;
                }
                this.result=response.data.toString();
                
                })
        
                
        },
        oneOper(one){ 
          this.checkerror(this.result);
            if(this.result.length!=0&&this.operation.length==0){
                axios.get(appUrl+'/oneOper',{
                    params :{
                        opera : one,
                        number : this.result
                      
                    }
                  })
                  .then(response => {
                    this.result=response.data.toString();
                   
                    })
            }else if(this.operation.length!=0&&this.numberstr.length==0){
                axios.get(appUrl+'/oneOper',{
                    params :{
                        opera : one,
                        number : this.result
                      
                    }
                  })
                  .then(response => {
                    this.numberstr=response.data.toString();
                    if(this.numberstr.charAt(0)=='I'||this.numberstr.charAt(0)=='C'){
                        var str=this.numberstr;
                        this.C();
                        this.result=str;
                    }else{this.lastnum=this.numberstr;
                        this.equalres("");}
                    
                    })
                    
            }else if(this.result.length!=0&&this.operation.length!=0){
                axios.get(appUrl+'/oneOper',{
                    params :{
                        opera : one,
                        number : this.numberstr
                    }
                  })
                  .then(response => {
                    this.numberstr=response.data.toString();
                    this.lastnum=this.numberstr;
                    })
            }else{
                this.numberstr.length==0?this.numberstr="0":this.numberstr;
                axios.get(appUrl+'/oneOper',{
                    params :{
                        opera : one,
                        number : this.numberstr
                      
                    }
                  })
                  .then(response => {
                    this.result=response.data.toString();
                    this.numberstr=""; 
                    })
                
            }
          
            
        },
        changesign(){ this.checkerror(this.result);
            
            if(this.numberstr.length==0&&this.result.length!=0&&this.operation.length==0){
                axios.get(appUrl+'/sign',{
                    params :{
                        num : this.result,
                      
                    }
                  })
                  .then(response => {
                    this.result=response.data.toString();
                    })
          
            }else{
                this.numberstr.length==0?this.numberstr="0":this.numberstr;
                axios.get(appUrl+'/sign',{
                    params :{
                        num : this.numberstr,
                      
                    }
                  })
                  .then(response => {
                    this.numberstr=response.data.toString();
                    
                    })
                    
            }
        },
        checkerror(s){
            if(s.charAt(0)=='I'||s.charAt(0)=='C'){
                this.C();
            }

        },
    },
    computed :{
        show(){
            if(this.result.length!=0&&this.numberstr.length==0){
                if(this.operation.length==0)
                   return this.numberstr.length?this.numberstr:0;
                else
                  return this.result;  
            }else{
              return  this.numberstr.length?this.numberstr:0;
            }
        }
    }
    
})
