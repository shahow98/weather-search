const App = {
    data() {
        return {
            form: {
                name: '',
                email: '',
                province: '',
                city: '',
                district: '',
                districtcode: '',
                options: {
                    provinces: [],
                    citys: [],
                    district: []
                }
            },
            rules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' }
                ],
                districtcode: [
                    { required: true, message: '请选择区', trigger: 'change' }
                ]
            }
        }
    },
    created() {
        this.initProvinceOpts();
    },
    watch: {
        'form.province'() {
            console.log(this);
            this.initCityOpts();
        },
        'form.city'() {
            this.initDistrictOpts();
        }
    },
    methods: {
        onSubmit() {
            axios.put('/weather-search/api/user/register', {
                name: this.form.name,
                email: this.form.email,
                districtcode: this.form.districtcode
            }).then((res) => {
                const data = res.data;
                if (data.code == 0) {
                    this.$message.success('注册成功!');
                    this.$refs['form'].resetFields();
                } else {
                    this.$message.error(data.errMsg);
                }
            });
        },
        initProvinceOpts() {
            axios.get('/weather-search/api/weather/find/provinces').then((res) => {
                this.form.options.provinces = [...res.data];
            });
        },
        initCityOpts() {
            axios.get(`/weather-search/api/weather/find/${this.form.province}/citys`).then((res) => {
                this.form.options.citys = [...res.data];
            });
        },
        initDistrictOpts() {
            axios.get(`/weather-search/api/weather/find/${this.form.city}/districts`).then((res) => {
                this.form.options.districts = [...res.data];
            });
        }
    }
};

window.onload = () => {
    axios.interceptors.request.use(
        function (config) {
            // 在post请求前统一添加X-CSRFToken的header信息
            let cookie = document.cookie;
            if (cookie && config.method != 'get') {
                config.headers['x-csrf-token'] = cookie.split('=')[1];
            }
            return config;
        },
        function (error) {
            // Do something with request error
            return Promise.reject(error);
        }
    );
    const app = Vue.createApp(App);
    app.use(ElementPlus);
    app.mount('#app');
}
