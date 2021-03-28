module.exports = {
    multipleMogooseToObject: (mogooseArrays) => {
        return mogooseArrays.map((mogooseArrays) => mogooseArrays.toObject());
    },

    mogooseToObject: (mogoose) => {
        return mogoose ? mogoose.toObject() : mogoose;
    },
};
