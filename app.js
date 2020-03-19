let budgetcontroller = (function () {

    let Expenses = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
    let incomes = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }


    let calculatetotal = function (type) {
        let sum = 0;
        data.allitems[type].forEach(function (currentitem) {
            sum += currentitem.value;
        })
        data.total[type] = sum
    }

    let data = {
        allitems: {
            exp: [],
            inc: []
        },
        total: {
            exp: 0,
            inc: 0,
            budget: 0,
            percentage: -1
        }
    }

    return {
        addItem: function (type, des, vlu) {
            let newItem, id;

            if (data.allitems[type].length > 0) {
                id = data.allitems[type][data.allitems[type].length - 1].id + 1;

            } else {
                id = 0
            }
            if (type === 'exp') {
                newItem = new Expenses(id, des, vlu)
            } else if (type === 'inc') {
                newItem = new incomes(id, des, vlu)
            }



            data.allitems[type].push(newItem);
            return newItem;

        },
        calculatebudget: function () {

            calculatetotal('inc');
            calculatetotal('exp');

            data.total.budget = data.total.inc - data.total.exp
            if (data.total.budget > 0) {
                data.total.persantage = Math.round((data.total.exp / data.total.inc * 100))

            } else {
                data.total.persantage = -1
            }

        },
        getbudget: function () {
            return {
                budget: data.total.budget,
                totalinc: data.total.inc,
                totalexp: data.total.exp,
                persantage: data.total.persantage
            }
        },
        deleteItem: function (type, id) {
            let ids, index

            ids = data.allitems[type].map(function (currentitem) {
                return currentitem.id
            })

            index = ids.indexOf(id)
            if (index !== -1) {
                data.allitems[type].splice(index, 1);
            }
        },
        view: function () {
            console.log(data);

        }
    }



})(); // therse types of functions are called iifi function 



let uicontroller = (function () {

    let domstring = {
        inputtype: '.add__type',
        inputdescription: '.add__description',
        inputvalue: '.add__value',
        inputbtn: '.add__btn',
        appendIncome: '.income__list',
        appendExpense: '.expenses__list',
        headerbudget: '.budget__value',
        headerIncome: '.budget__income--value',
        headerExpenses: '.budget__expenses--value',
        headerpersantage: '.budget__expenses--percentage',
        deletecontainer: '.container'
    }



    return {
        getinput: function () {
            return {
                type: document.querySelector(domstring.inputtype).value,
                description: document.querySelector(domstring.inputdescription).value,
                value: parseFloat(document.querySelector(domstring.inputvalue).value)
            }
        },
        addNewItem: function (obj, type) {
            let html, newhtml, element;
            if (type === 'inc') {
                element = domstring.appendIncome;
                html = '<div class="item clearfix" id="inc-%ID%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">%VALUE%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if (type === 'exp') {
                element = domstring.appendExpense;
                html = '<div class="item clearfix" id="exp-%ID%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">%VALUE%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

            }

            newhtml = html.replace('%ID%', obj.id);
            newhtml = newhtml.replace('%DESCRIPTION%', obj.description);
            newhtml = newhtml.replace('%VALUE%', obj.value);

            document.querySelector(element).insertAdjacentHTML('beforeend', newhtml)
        },
        deleteItemUi: function (selectId) {
            ;


            let el = document.querySelector('#' + selectId)
            el.parentNode.removeChild(el);
        },
        clearfeald: function () {

            fealds = document.querySelectorAll(domstring.inputdescription + ', ' + domstring.inputvalue);

            fealdsArray = Array.prototype.slice.call(fealds);

            fealdsArray.forEach(function (currentitem, intex, array) {
                currentitem.value = ''
            })
            fealdsArray[0].focus();



        },
        budgetui: function (obj) {

            document.querySelector(domstring.headerbudget).textContent = obj.budget;
            document.querySelector(domstring.headerIncome).textContent = obj.totalinc;
            document.querySelector(domstring.headerExpenses).textContent = obj.totalexp;
            if (obj.totalinc > 0) {
                document.querySelector(domstring.headerpersantage).textContent = obj.persantage + ' %';
            } else {
                document.querySelector(domstring.headerpersantage).textContent = '---'
            }


        },

        dominput: function () {
            return domstring;
        }
    }



})();

let controller = (function (bdtctl, uictl) {


    let updatebudget = function () {

        //calculate budget
        budgetcontroller.calculatebudget();
        //return budget
        let budgets = budgetcontroller.getbudget();
        //ui update
        uictl.budgetui(budgets)



    }
    let cntAddItem = function () {
        let input = uictl.getinput();

        if (input.description !== "" && input.value > 0) {
            let newitem = budgetcontroller.addItem(input.type, input.description, input.value);
            uictl.addNewItem(newitem, input.type);
            uictl.clearfeald();
            updatebudget();
        }

    }

    let seteventlistener = function () {
        let dom = uictl.dominput();

        document.querySelector(dom.inputbtn).addEventListener('click', cntAddItem);

        document.addEventListener('keypress', function (e) {
            if (e.keyCode === 13) {
                cntAddItem()
            }
        })
        document.querySelector(dom.deletecontainer).addEventListener('click', cntDeleteItem)
    }


    let cntDeleteItem = function (event) {

        let item = event.target.parentNode.parentNode.parentNode.parentNode.id
        if (item) {
            splitId = item.split('-')
            type = splitId[0];
            ID = parseInt(splitId[1])
            bdtctl.deleteItem(type, ID);
            uictl.deleteItemUi(item);
           


            updatebudget()
        }
      

    }


    return {
        init: function () {
            console.log('application is started');
            seteventlistener();

        }
    }





})(budgetcontroller, uicontroller);


controller.init();