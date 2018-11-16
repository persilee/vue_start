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
    ],
    published: false,
    total: 0,
}

var uiButton = {
    template: `<button class="ui button">button</button>`,
}

Vue.component('ui-button-g',{
    template: `<button class="ui button">{{ text }}</button>`,
    props: ['text']
});

Vue.component('ui-button-g-p', {
    template: `<button class="ui button">{{ text }}</button>`,
    props: {
        text: {
            type: String,
            default: 'button',
            required: true,
            validator (value){
                return value.length > 3 ;
            }
        }
    }
});

Vue.component('ui-button-g-e', {
    template: `<button @click="increment" class="ui button">{{ counter }}</button>`,
    data (){
        return {
            counter: 0,
        }
    },
    methods: {
        increment (){
            this.counter += 1;
            this.$emit('increment');
        },
    }
});

Vue.component('segment', {
    template: `
    <div class="ui stacked segment">
        <slot>:)</slot>
    </div>
    `,
});

Vue.component('card', {
    template: `
        <div class="ui card">
            <div class="image">
                <slot name="image">image</slot>
            </div>
            <div class="content">
                <div class="header">
                    <slot name="header">header</slot>
                </div>
                <div class="mata">
                    <slot name="meta">meta</slot>
                </div>
            </div>
        </div>
    `,
});

const Home = {
    template: '<h2>首页</h2>'
}
const  Event = {
    template: `
    <div>
        <h2>活动 {{ id }}</h2>
        <router-view></router-view>
    </div>
    `,
    beforeRouteUpdate(to, from, next){
        console.log(from, to);
        next();
    },
    props: ['id']
}
const Active = {
    template: '<h2>动态</h2>'
}

const RComment = {
    template:  `
    <div>
        <hr class="ui divider section">
        <h2>评论</h2>
    </div>
    `,
}

const routes = [
    {
        path: '/',
        component: Home,
        name: 'home',
    },
    {
        path: '/home',
        redirect: {name: 'home'}
    },
    {
        path: '/events:id',
        component: Event,
        props: true,
        children: [
            {
                path: 'comments',
                component: RComment,
            }
        ],
        name: 'activity',
    },
    {
        path: '/active',
        component: Active,
    },
];

const router = new VueRouter({
    routes
})

var app =  new Vue({
    el: '#app',
    router,
    data: dataSource,
    components: {
        'ui-button': uiButton,
    },
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
        },
        incrementTotal(){
            this.total += 1;
        }
    }
})

app.$watch('message',function (newVal, oldVal) {  
    console.log(newVal, oldVal);
    
})