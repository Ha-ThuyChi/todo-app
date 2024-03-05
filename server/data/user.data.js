
module.exports = {
    initial: function (User) {
        User.create(
            {
                name: "Ann",
                email: "Ann1@gmail.com",
                password: "$2b$10$15RHX5fhAL/U/ryDmQTNdulOj9XuV6nFBPekfroLScVHYZmGDbkw6",
                dob: "2023-01-01"
            }
        );
        User.create(
            {
                name: "Ann",
                email: "Ann2@gmail.com",
                password: "$2b$10$hAQEfCmzopWAcc6k6wU5tupUigt3Bu3eJ4rv3WCCvxu9Nsq2qNvoy",
                dob: "2023-01-01"
            }
        );
        User.create(
            {
                name: "Ann",
                email: "Ann3@gmail.com",
                password: "$2b$10$lk/ljY9rKZPWVHR2Y399m.u91PC95tbAZdvU5AO61dYgBtbleMu3K",
                dob: "2023-01-01"
            }
        );
        User.create(
            {
                name: "Ann",
                email: "Ann4@gmail.com",
                password: "$2b$10$oWqWFs98h72fnZ7wmZIUluVPW4P0PsPumeYZM/QM1K2nLHF69X1rW", //88888888
                dob: "2023-01-01"
            }
        );
    }
}