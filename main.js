const store = new Vuex.Store({
    state: {
        count: 0,
        counters: [],
    },
    mutations: {
        add(state, payload) {
            state.count += payload;
        },
        gagarin(state, payload) {
            state.counters.push(payload);
        },
        remove(state) {
            state.counters.pop();
        }
    },
    getters: {
        sum(state) {
            return state.counters.reduce((a, b) => a + b, 0);
        },
        total(state) {
            return state.counters.length;
        },
        average(state, getters) {
            return +(getters.sum / getters.total * 100 / 100).toFixed(1);
        }
    }
})

const AddButton = {
    template: `
    <div class="ui buttons">
        <button class="ui button" @click="add">add</button>
        <button class="ui button" @click="average">average</button>
        <button class="ui button" @click="remove">remove</button>
    </div>
        
    `,
    methods: {
        add() {
            this.$store.commit('add', Math.floor(Math.random() * (10 - 1) + 1));
        },
        average() {
            this.$store.commit('gagarin', Math.floor(Math.random() * (10 - 1) + 1));
        },
        remove() {
            this.$store.commit('remove');
        }
    }
}

const Counter = {
    template: `
    <div>
        <div class="ui red circular label">{{ count }}</div>
        <div class="ui red circular label">{{ counters }}</div>
        <div class="ui yellow circular label">{{ average }}</div>
        <add-button></add-button>
    </div>
    `,
    components: {
        AddButton
    },
    computed: {
        count() {
            return this.$store.state.count;
        },
        counters() {
            return this.$store.getters.sum;
        },
        average() {
            return this.$store.getters.average ? this.$store.getters.average : 0;
        }
    }
}


var dataSource = {
    message: 'hello',
    loggedIn: false,
    imageSrc: 'https://cn.vuejs.org/images/logo.png',
    imgWidth: '10%',
    buttonClass: 'ui button',
    colorClass: 'violet',
    isLoading: false,
    items: [{
            text: 'nice'
        },
        {
            text: 'great'
        },
        {
            text: 'awesome'
        },
    ],
    counter: 0,
    inputVal: '',
    checkBoxVal: [],
    radioVal: '',
    selected: '',
    options: [{
            value: 'hello'
        },
        {
            value: 'hola'
        },
        {
            value: 'wow'
        },
    ],
    published: false,
    total: 0,
}

var uiButton = {
    template: `<button class="ui button">button</button>`,
}

Vue.component('ui-button-g', {
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
            validator(value) {
                return value.length > 3;
            }
        }
    }
});

Vue.component('ui-button-g-e', {
    template: `<button @click="increment" class="ui button">{{ counter }}</button>`,
    data() {
        return {
            counter: 0,
        }
    },
    methods: {
        increment() {
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
const Event = {
    template: `
    <div>
        <h2>活动 {{ id }}</h2>
        <router-view></router-view>
    </div>
    `,
    beforeRouteUpdate(to, from, next) {
        console.log(from, to);
        next();
    },
    props: ['id']
}
const Active = {
    template: '<h2>动态</h2>'
}

const RComment = {
    template: `
    <div>
        <hr class="ui divider section">
        <h2>评论</h2>
    </div>
    `,
}

const routes = [{
        path: '/',
        component: Home,
        name: 'home',
    },
    {
        path: '/home',
        redirect: {
            name: 'home'
        }
    },
    {
        path: '/events:id',
        component: Event,
        props: true,
        children: [{
            path: 'comments',
            component: RComment,
        }],
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

var app = new Vue({
    el: '#app',
    router,
    store,
    data: dataSource,
    components: {
        'ui-button': uiButton,
        Counter,
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
        inputChange(event) {
            console.log(event.target.value);
        },
        incrementTotal() {
            this.total += 1;
        }
    }
})

app.$watch('message', function (newVal, oldVal) {
    console.log(newVal, oldVal);

})