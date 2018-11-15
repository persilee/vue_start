var dataSource = {
    message: 'hello',
    loggedIn: false,
    imageSrc: 'https://cn.vuejs.org/images/logo.png',
    imgWidth: '10%',
    buttonClass: 'ui button',
    colorClass: 'violet',
    isLoading: false,
    items: [
        {text: 'nice'},
        {text: 'great'},
        {text: 'awesome'},
    ],
    counter: 0,
    inputVal: '',
    checkBoxVal: [],
    radioVal: '', 
    selected: '',
    options: [
        {value: 'hello'},
        {value: 'hola'},
        {value: 'wow'},
    ]
}

var app =  new Vue({
    el: '#app',
    data: dataSource,
    beforeDestroy() {
        console.log('要被干掉了');
    },
    destroyed() {
        console.log('bye bye ~ !');
    },
    methods: {
        like(e) {
            this.counter += 1;
            console.log(e);
        },
        process(event) {
            this.inputVal = event.target.value;
            console.log(event);
            console.log(this.inputVal);
        },
        inputChange(event){
            console.log(event.target.value);
        }
    }
})

app.$watch('message',function (newVal, oldVal) {  
    console.log(newVal, oldVal);
    
})