const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './Database/SQHotel.sqlite'
});
const BookingHotel = sequelize.define('Booking', { //studio Anime
    Booking_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    User_id: { // foreign key to Studio
        type: Sequelize.INTEGER,
        foreignKey: false
    },
    Type_id:{
        type: Sequelize.INTEGER,
        foreignKey: false
    },
    Room:{
        type: Sequelize.INTEGER,
        foreignKey: false
    }
}, {
    timestamps: false
});
const Users = sequelize.define('Users', {
    User_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, 
    Name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    phone:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
});
const RoomType = sequelize.define('RoomType', {
    Type_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, 
    Type_Name:{
        type: Sequelize.STRING,
        allowNull: false
    }
});
const Room = sequelize.define('Room', {
    Room_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, 
    Type_id:{
        type: Sequelize.STRING,
        allowNull: false
    },
    Type_Name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    price:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});
 

BookingHotel.belongsTo(Users, { foreignKey: 'User_id', as: 'belongsToUsers' });
BookingHotel.belongsTo(RoomType, { foreignKey: 'Type_id', as: 'belongsToRoomType' });
BookingHotel.belongsTo(Room, { foreignKey: 'Room_id', as: 'belongsToRoom' });


sequelize.sync();


module.exports = {BookingHotel, Users, RoomType, Room}


// export default Shelves