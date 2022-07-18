var birthday = document.querySelector("#birthday");
var check = document.querySelector("#check");
var output = document.querySelector("#output");



function reversedate(str){
//var str = "";
var charlist = str.split('');
var reversedlist = charlist.reverse();
reversedlist = reversedlist.join('');
return reversedlist;
//ispalindrome(str,reversedlist);
}

function ispalindrome(fstr){
        
    var reversedstring = reversedate(fstr);
    return fstr === reversedstring;
}
function dateasstring(dateinstring1){
    console.log(dateinstring1);

  var dateinstring = {day:"", month:"", year:""};

  if(dateinstring1.day<10){
    dateinstring.day = "0" + dateinstring1.day;
  }else{
    dateinstring.day = ""+dateinstring1.day;
  }

  if(dateinstring1.month<10){
    dateinstring.month = "0" + dateinstring1.month;
  }else{
    dateinstring.month = ""+dateinstring1.month;
  }

  dateinstring.year = ""+dateinstring1.year;
  
  return dateinstring;
  //console.log(dateinstring);
}
function getdateinformat(dateinformat){
    console.log(typeof dateinformat);
    
    var ddmmyyyy = dateinformat.day + dateinformat.month + dateinformat.year;
    var mmddyyyy = dateinformat.month + dateinformat.day + dateinformat.year;
    var yyyymmdd = dateinformat.year + dateinformat.month + dateinformat.day;
    var ddmmyy = dateinformat.day + dateinformat.month + dateinformat.year.slice(-2);
    var mmddyy = dateinformat.month + dateinformat.day + dateinformat.year.slice(-2);
    var yyddmm = dateinformat.year.slice(-2) + dateinformat.day + dateinformat.month;
     
    
   return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm] ;
}

function checkPalindromeForAll(datesinpalindrome){
    var dateformats = getdateinformat(datesinpalindrome);
    console.log(dateformats);
    
    var palindromelist = [];

    for(var i=0; i<dateformats.length; i++){
        var result = ispalindrome(dateformats[i]);
        palindromelist.push(result);
    }
    return palindromelist;

}

function isleapYear(year){
    if (year%400 === 0) return true;

    if (year%100 === 0) return false;

    if (year%4 === 0) return true;

    return false;
}

function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month==2){
        if(isleapYear(year)){
            if(day>29){
                day = 1;
                month = 3;
            }
        }else{
            if(day>28){
                day=1;
                month=3;
            }
        }
    }else{
        if(day>daysInMonth[month-1]){
            day=1;
            month++;
        }
    }

    if(month>12){
        month=1;
        year++;
    }
    return{
        day: day,
        month: month,
        year: year,
    };
}



function getNextPalindromeDate(datestr1){
    console.log(datestr1);
     var nextdate = getNextDate(datestr1);
     console.log(nextdate);
     var ctr=0;
    while(1){
        ctr++;
        console.log(ctr);
        var datestring = dateasstring(nextdate); 
        console.log(datestring);
        var resultlist = checkPalindromeForAll(datestring);
        console.log(resultlist);

        for(let i=0; i< resultlist.length; i++){
           if(resultlist[i]){
               return [ctr, nextdate];
            }
        }
        nextdate = getNextDate(nextdate);
        output.innerHTML = `Nearest palindrome date is ${nextdate.day} - ${nextdate.month} - ${nextdate.year}`;
     } 
     
    }

    function clickHandler(e){
        var bdaystring = birthday.value;
        if(bdaystring !== ""){
            var date = bdaystring.split("-");
            var yyyy = date[0];
            var mm = date[1];
            var dd = date[2];
        

        var date = {
            day : Number(dd),
            month : Number(mm),
            year : Number (yyyy),
        };

        var dateStr = dateasstring(date);
        var list = checkPalindromeForAll(dateStr);
        var ispalindrome = false;
        for(let i=0; i<list.length; i++){
            if(list[i]){
                ispalindrome=true;
                output.innerHTML = "Your birthday is a palindrome!";
                break;
                
            }
        }
        if(!ispalindrome)
        {         
            const[ctr1, nextdate] = getNextPalindromeDate(date);
    
    }
        }
    }   

    check.addEventListener("click",clickHandler)
