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
    Room_id:{
        type: Sequelize.INTEGER,
        foreignKey: false
    },
    date_checkin:{
        type:'TIMESTAMP',
        allowNull: null,  
    },
    date_checkout:{
        type: 'TIMESTAMP',
        allowNull: null,
        
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
    }, 
    Type_quantity:{
        type:Sequelize.INTEGER,
        allowNull: false
    }});

const Room = sequelize.define('Room', {
    Room_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, 
    Type_id:{
        type:Sequelize.INTEGER,
        foreignKey: false
    },
   Room_quantity:{
        type:Sequelize.INTEGER,
        allowNull: false
    },
    
    price:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});


const Admin = sequelize.define('Admin', {
    admin_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, 
    admin_name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    admin_username:{
        type: Sequelize.STRING,
        allowNull: false
    },
    admin_password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    admin_email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    admin_phone:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

BookingHotel.belongsTo(Users, { foreignKey: 'User_id', });
BookingHotel.belongsTo(RoomType, { foreignKey: 'Type_id', });
BookingHotel.belongsTo(Room, { foreignKey: 'Room_id', });
BookingHotel.belongsTo(Room, { foreignKey: 'Type_id', });


sequelize.sync();


module.exports = {BookingHotel, Users, RoomType, Room,  Admin}


// export default Shelves