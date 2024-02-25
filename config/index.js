const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('database', 'usename', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: 'Database/library.db'
});
const Book = sequelize.define('Books', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    author: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    shelf_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }

});
const Shelves = sequelize.define('Shelves', {
    shelf_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    category: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    total_books: {
        type: Sequelize.INTEGER,
        allowNull: true,
    }
});
sequelize.sync();


module.exports = {Book, Shelves}


// export default Shelves