/* eslint-disable no-undef */
const path = require('path'); // path - превращает относительный путь в абсолютный
const   HtmlWebpackPlugin = require('html-webpack-plugin'); // подключаем плагин обработки html
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключаем плагин, удаляющий содержимое папки dist
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // подключаем плагин объединения css файлов

module.exports =
{
    entry: { main: './src/scripts/index.js' }, //ТОЧКА ВХОДА

    output:  // ТОЧКА ВЫХОДА: путь, имя, свойство обновления путей внутри ксс и хтмл
    {
        path: path.resolve(__dirname, '../dist'), // ссылка на текущую папку и относительный путь к точке выхода
        filename: 'main.js',
        publicPath: ''
    },

    mode: 'development', // режим разработчика
    devServer:
    {
        static: path.resolve(__dirname, '../dist'), // путь, куда "смотрит" режим разработчика
        compress: true, // это ускорит загрузку в режиме разработки
        port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт

        open: true // сайт будет открываться сам при запуске npm run dev
    },

    module: 
    {
        rules: 
        [
            {
                test: /\.js$/, // регулярное выражение, которое ищет все js файлы
                use: 'babel-loader', // при обработке файлов .js нужно использовать babel-loader
                exclude: '/node_modules/' // исключает папку node_modules, файлы в ней обрабатывать не нужно
            },
            {
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/, // регулярное выражение, которое ищет все файлы с такими расширениями
                type: 'asset/resource' // в каком виде Webpack перенесёт файлы в папку dist - позволяет переносить исходные файлы в конечную сборку в том же формате
            },
            {
                test: /\.css$/, // применять это правило только к CSS-файлам
                use: // при обработке этих файлов нужно использовать MiniCssExtractPlugin.loader и css-loader
                [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {importLoaders: 1} // добавили настройку из документации
                    },
                    'postcss-loader' // добавили постксс лоадер
                ]
            }
        ]

    },

    plugins: 
    [
        new HtmlWebpackPlugin
        (
            {
                template: './src/index.html' // путь к index.html
            }
        ),
        new CleanWebpackPlugin(), // использовали плагин без настройки
        new MiniCssExtractPlugin() // подключили плагин для объединения файлов

    ] // добавили массив плагинов



}