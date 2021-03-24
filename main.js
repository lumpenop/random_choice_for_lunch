

yesterday = '';


if (localStorage.getItem("counter")==null){
    localStorage.setItem("counter", '0');
    localStorage.setItem("restCounter", '0');

}


// mList, toList를 localStorage에서 가져와서
// 문자열을 배열로 변경해야함 for 문 사용?


if (localStorage.getItem("mList")==null){
    mList = []
    localStorage.setItem("mList",mList)
} else {

    mList = localStorage.getItem("mList");
    mList = mList.split(',')
    for(i=0; i<mList.length; i++){
        storageMenu = localStorage.getItem(mList[i]);
    
    
        li = document.createElement('li');
        li.innerHTML = storageMenu;
        li.className = mList[i]
    
        delBtn = document.createElement('button');
        delBtn.innerHTML = 'x';
        delBtn.setAttribute("onclick","delToDo(this);")
        delBtn.className = "del_menu"
    
    
        existingMenu = document.querySelector('.menu_list');
        existingMenu.appendChild(li);
    
    }
    
}

if (localStorage.getItem("toList")==null){
    toList = []
    localStorage.setItem("toList",toList)
} else {
    toList = localStorage.getItem("toList");
    toList = toList.split(',')
    for(i=0; i < toList.length; i++){
        storageMenu = localStorage.getItem(toList[i]);
        li = document.createElement('li');
        li.innerHTML = storageMenu;
    
        toDoList = document.querySelector('.todo_list');
        toDoList.appendChild(li);
    
        li.className = toList[i];
    
    }
}

console.log(toList)
console.log(mList)


n = parseInt(localStorage.getItem("counter"));
n2 = parseInt(localStorage.getItem("restCounter"));


    


function addToDo(){
    menuArr = document.querySelectorAll(".menu_list > li");
    menu = [];
    if (menuArr.length >= 2){
        for(i=0; i<menuArr.length;i++){
            menu.push(menuArr[i].innerHTML);
        }
        if (menu.includes(yesterday)){
            todayArray = notYesterday(menu);
        } else {
            todayArray = menu;
        }
        
        todayMenu = randomForMenu(todayArray);

        today = new Date();
        month = today.getMonth()+1;
        day = today.getDay();
        n++;
        li = document.createElement('li');
        li.innerHTML = month+"/"+day+"&nbsp&nbsp"+todayMenu;
        li.className = "menuList" + n;
        toList.push(li.className)
        localStorage.setItem("toList" ,toList);
        console.log(toList)
        menuList = li.innerHTML;
        
        localStorage.setItem("menuList"+ n, menuList);
        localStorage.removeItem('counter');
        localStorage.setItem("counter", n);
        

        yesterday = todayMenu;

        toDoList = document.querySelector('.todo_list');
        toDoList.appendChild(li);
    } else {
        alert('식당은 두 곳 이상 입력해주세요')
    }
}

function randomForMenu(todayArray){
    // 오늘의 메뉴 리턴
    rand = Math.random();
    randint = Math.floor(rand * (todayArray.length));
    return todayArray[randint]
}

function notYesterday(menu){
    idx = menu.indexOf(yesterday);
    menu.splice(idx, 1);

    return menu;
}


function delToDo(delBtn){

    if (confirm("정말 삭제할까요?")){
    
        localStorage.removeItem(delBtn.parentNode.className);
        delBtn.parentNode.parentNode.removeChild(delBtn.parentNode);
        
        if (delBtn.parentNode.className.slice(0, -1)=='menuList'){
            n = parseInt(localStorage.getItem("counter"));
            n--;
            localStorage.setItem("counter", n);
            localStorage.removeItem(delBtn.parentNode.className);
            idx = toList.indexOf(delBtn.parentNode.className);
            toList.splice(idx, 1);
            console.log(delBtn.parentNode.className)
            localStorage.setItem("toList", toList);
            
        } else {
            n = parseInt(localStorage.getItem("restCounter"));
            n--;
            localStorage.setItem("restCounter", n2);
            localStorage.removeItem(delBtn.parentNode.className);
            idx = mList.indexOf(delBtn.parentNode.className);
            mList.splice(idx, 1);
            console.log(delBtn.parentNode.className)
            localStorage.setItem("mList", mList);
        }
        
    
    }
}

function pressKey(event){
    if(event.keyCode ==13){
        addMenu();
    }
}


function addMenu(){
    menuArr = document.querySelectorAll(".menu_list > li ");
    menu = [];
    

    for(i=0; i<menuArr.length;i++){
        menu.push(menuArr[i].innerHTML);
    }
    newMenu = document.querySelector('.input_menu').value;
    
    if (!menu.includes(newMenu) && newMenu != ''){
        li = document.createElement('li');
      
        if (localStorage.getItem("restCounter")==null){
            localStorage.setItem("restCounter",0)
        }
       

        li.className = "rest" + n2;
        mList.push(li.className)
        localStorage.setItem("mList" ,mList);
        console.log(mList)
        li.innerHTML = newMenu;
       
        
        delBtn = document.createElement('button');
        delBtn.innerHTML = 'x';
        delBtn.setAttribute("onclick","delToDo(this);")
        delBtn.className = "del_menu"
        li.appendChild(delBtn);

        existingMenu = document.querySelector('.menu_list');
        existingMenu.appendChild(li);
        document.querySelector('.input_menu').value = '';

        localStorage.setItem("rest" + n2, li.innerHTML);
        n2++;
        localStorage.setItem("restCounter",n2)

    } else if (menu.includes(newMenu)){
        alert('이미 존재하는 식당이에요')
    }

}