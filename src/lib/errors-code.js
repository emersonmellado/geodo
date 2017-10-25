"use strict";

/**
 * @description Error Codes to centralize the messages
 * @author Emerson Mellado
 * @since 24/10/2017
 */

module.exports = {
	getErrorsCode: function() {
		return {
			DUPLICATED_USER: {
				errorCode: '001',
				message: 'Register using email already taken.'
			},
			USER_NOT_FOUND: {
				errorCode: '002',
				message: 'User not found.'
			},
			INVALID_PASSWORD: {
				errorCode: '003',
				message: 'Invalid password.'
			},
			EMAIL_NOT_FOUND: {
				errorCode: '004',
				message: 'Email not found.'
			},
			AUTHENTICATION_FAILED: {
				errorCode: '005',
				message: 'Authentication failed.'
			},
			INVALID_TOKEN: {
				errorCode: '006',
				message: 'Invalid token.'
			},
			MISSING_TOKEN: {
				errorCode: '007',
				message: 'Missing authentication token.'
			}
		}
	}
}