package first.calculater;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin()//vue origins = {"http://127.0.0.1:5500"}
public class controller {
   @GetMapping("/twoOper")
    public String operations(String result,String operation,String number){
        double x=Double.parseDouble(result);
        double y=Double.parseDouble(number);
        double z;
        if(operation.compareTo("+")==0){
          z=add(x,y);
        }else if(operation.compareTo("-")==0){
            z=subtract(x,y);
        }else if(operation.compareTo("÷")==0){
            if(x==0){
                return "Can't Divided By Zero";
            }
            z=divided(x,y);

        }else if(operation.compareTo("×")==0){
            z=times(x,y);
        }else {
            z=x;
        }
        if((long)z==z){
            return String.valueOf((long)z);
        }
        return String.valueOf(z);
    }
    public double add(double x,double y){
        return  x+y;
    }
    public  double subtract(double x,double y){
        return x-y;
    }
    public  double divided(double x,double y){
        return x/y;
    }
    public  double times(double x,double y){
        return x*y;
    }

    @GetMapping("/oneOper")
    public String oneoper(String opera,String number){
        double x=Double.parseDouble(number);
        double z;
        if(opera.compareTo("|")==0){
            if(x==0)
                return "Can't Divided By Zero";
            z=1/x;
        }else if(opera.compareTo("s")==0){
            if(x<0)
                return  "Invalid Input";
            z=Math.sqrt(x);
        }else if(opera.compareTo("2")==0){
            z=x*x;
        }else {//%
            z=x/100;
        }
        if((long)z==z){
            return String.valueOf((long)z);
        }
        return String.valueOf(z);
    }
    @GetMapping("/sign")
    public String changeSign(String num){

        if(num.charAt(0)=='-'){
            return num.substring(1);
        }
        if(Double.parseDouble(num)==0)
            return  num;
        return "-"+num;
    }

}
