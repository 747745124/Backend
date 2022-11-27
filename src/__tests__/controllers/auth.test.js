const { authLoginController } = require('../../controllers/auth');
const User = require('../../database/schemas/User');
const { hashPassword, comparePassword } = require('../../utils/helper');

jest.mock('../../database/schemas/User');
jest.mock('../../utils/helper', () => ({
    hashPassword: jest.fn((s) => s),
    comparePassword: jest.fn((a, b) => a === b)
}));

const request = {
    body: {
        email: 'user@example.com',
        password: 'welcome'
    },
    session: {
        user: {
            email: 'user@example.com', password: hashPassword('welcome')
        }
    }
}

const response = {
    status: jest.fn((s) => s),
    send: jest.fn((s) => s),
};

const empty_request = {
    body: {
        email: '',
        password: ''
    },
    session: {
        user: {
            email: '', password: hashPassword('')
        }
    }
};

it('should send a status code of 200 when successfully login', async () => {
    User.findOne.mockImplementationOnce(() => ({
        email: 'user@example.com', password: hashPassword('welcome')
    }));
    await authLoginController(request, response);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledTimes(1);
});

it('should send a status code of 401 when no password is not matching', async () => {
    User.findOne.mockImplementationOnce(() => ({
        email: 'user@example.com', password: hashPassword('welcome2')
    }));
    await authLoginController(request, response);
    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
});
it('should send a status code of 400 when there is no input', async () => {
    User.findOne.mockImplementationOnce(() => ({
        email: 'no@example.com', password: hashPassword('welcome')
    }));
    await authLoginController(empty_request, response);
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalledTimes(1);
})