const autoprefixer = require('autoprefixer'); // подключаем плагин autoprefixer в файл
const cssnano = require('cssnano'); // подключаем плагин cssnano в файл

module.exports = 
{
    plugins : // подключаем плагины к PostCSS, 
    [
        autoprefixer, 
        cssnano({preset: 'default'}) // default говорит о том, что нужно использовать стандартные настройки минификации
    
    ]
};
