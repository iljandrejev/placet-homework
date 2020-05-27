const validdationRules = {
    firstname: {
        presence: {
            message: "Please enter your firstname",
        },
    },
    lastname: {
        presence: {
            message: "Please enter your lastname",
        }
    },
    email: {
        presence: {
            message: "Please enter customer email",
        },
        email: {
            message: "Please enter valid email"
        }
    },
    education: {
        presence: {
            message: "Please select customer education level"
        }
    }
};

export default validdationRules;