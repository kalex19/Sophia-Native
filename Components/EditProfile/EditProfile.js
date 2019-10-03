import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import styles from './styles';
import Button from '../common/Button/Button';
import Header from '../common/Header/Header';
import Input from '../common/Input/Input';
import { patchClientProfile } from '../../Utils/clientApiCalls';
import { patchCaretakerProfile } from '../../Utils/caretakerApiCalls';
import theme from '../../theme';
import { loadProfile } from '../../actions';

export class EditProfile extends Component {
	state = {
		name: this.props.user.name || null,
		username: this.props.user.username || null,
		password: '',
		password_confirmation: '',
		email: this.props.user.email || null,
		phone: this.props.user.phone_number || null,
		address: this.props.user.street_address || null,
		city: this.props.user.city || null,
		state: this.props.user.state || null,
		zip: this.props.user.zip || null,
		allergies: this.props.user.allergies || [],
		needs: this.props.user.needs || [],
		diet_restrictions: this.props.user.diet_restrictions || [],
		medications: this.props.user.medications || [],
		abilities: this.props.user.abilities || []
	};

	handleChange = (name, value) => {
		const multiResponseInputs = ['needs', 'allergies', 'diet', 'medications', 'abilities'];
		if (multiResponseInputs.includes(name)) {
			value = value.split(',');
		}
		this.setState({ [name]: value });
	};

	handleSubmitEdit = async () => {
		const { user } = this.props;
		if (this.props.user.role === 'client') {
			const updatedProfile = {
				name: this.state.name,
				username: this.state.username,
				street_address: this.state.address,
				city: this.state.city,
				state: this.state.state,
				zip: this.state.zip,
				password: this.state.password,
				password_confirmation: this.state.password_confirmation,
				email: this.state.email,
				phone_number: this.state.phone,
				needs: this.state.needs,
				allergies: this.state.allergies,
				medications: this.state.medications,
				diet_restrictions: this.state.diet_restrictions
			};
			// let update = 
			await patchClientProfile(updatedProfile, user.id);
			// this.setState({
			// 	name: update.name,
			// 	username: update.username,
			// 	street_address: update.address,
			// 	city: update.city,
			// 	state: update.state,
			// 	zip: update.zip,
			// 	password: update.password,
			// 	email: update.email,
			// 	phone_number: update.phone,
			// 	needs: update.needs,
			// 	allergies: update.allergies,
			// 	medications: update.medications,
			// 	diet_restrictions: update.diet_restrictions
			// })
			this.props.navigation.navigate('Profile');
		} else {
			const updatedProfile = {
				username: this.state.username,
				name: this.state.name,
				password: this.state.password,
				password_confirmation: this.state.password_confirmation,
				email: this.state.email,
				phone: this.state.phone,
				abilities: this.state.abilities
			};
			await patchCaretakerProfile(updatedProfile, user.id);
		}
	};

	renderClientInfo = () => {
		return (
			<View>
				<View>
					<Input
						style={{ fontSize: 25 }}
						value={this.state.address}
						onChangeText={value => this.handleChange('address', value)}
						label="Address"
					/>
				</View>
				<View>
					<Input
						style={{ fontSize: 25 }}
						value={this.state.city}
						onChangeText={value => this.handleChange('city', value)}
						label="City"
					/>
				</View>
				<View>
					<Input
						style={{ fontSize: 25 }}
						value={this.state.state}
						onChangeText={value => this.handleChange('state', value)}
						label="State"
					/>
				</View>
				<View>
					<Input
						style={{ fontSize: 25 }}
						value={this.state.zip}
						onChangeText={value => this.handleChange('zip', value)}
						saveRecordedText={text => this.handleChange('zip', text)}
						label="Zip Code"
					/>
				</View>
				<View style={styles.infoContainer}>
					<Text style={styles.text}>Needs:</Text>
					<Input
						style={{ fontSize: 20 }}
						key={Math.random()}
						value={this.state.needs}
						onChangeText={value => this.handleChange('needs', value)}
						saveRecordedText={text => this.handleChange('needs', text)}
						label="Edit your needs"
					/>
				</View>
				<View style={styles.infoContainer}>
					<Text style={styles.text}>Allergies: </Text>
					<Input
						style={{ fontSize: 20 }}
						key={Math.random()}
						value={this.state.allergies}
						onChangeText={value => this.handleChange('allergies', value)}
						saveRecordedText={text => this.handleChange('allergies', text)}
						label="Edit your allergies"
					/>
				</View>
				<View style={styles.infoContainer}>
					<Text style={styles.text}>Dietary Restrictions: </Text>
					<Input
						style={{ fontSize: 20 }}
						key={Math.random()}
						value={this.state.diet_restrictions}
						onChangeText={value => this.handleChange('diet_restrictions', value)}
						saveRecordedText={text => this.handleChange('diet_restrictions', text)}
						label="Edit your diet restrictions"
					/>
				</View>
				<View style={styles.infoContainer}>
					<Text style={styles.text}>Medications:</Text>
					<Input
						style={{ fontSize: 20 }}
						key={Math.random()}
						value={this.state.medications}
						onChangeText={value => this.handleChange('medications', value)}
						saveRecordedText={text => this.handleChange('medications', text)}
						label="Edit your medications"
					/>
				</View>
			</View>
		);
	};

	renderCaretakerInfo = () => {
		return (
			<View style={styles.infoContainer}>
				<Text style={styles.text}>Abilities:</Text>
				<Input
					style={{ fontSize: 20 }}
					key={Math.random()}
					value={this.state.abilities}
					onChangeText={value => this.handleChange('abilities', value)}
					saveRecordedText={text => this.handleChange('abilities', text)}
					label="Edit your abilities"
				/>
			</View>
		);
	};

	render() {
		return (
			<View style={theme.container}>
				<Header>My Profile</Header>
				<Button accessibilityLabel="Tap me to submit your edited profile." onPress={() => this.handleSubmitEdit()}>
					Save Profile
				</Button>
				<ScrollView style={styles.scrollContainer}>
					<Input
						style={{ fontSize: 25 }}
						value={this.state.name}
						onChangeText={value => this.handleChange('name', value)}
						saveRecordedText={text => this.handleChange('name', text)}
						label="Name"
					/>
					<Input
						style={{ fontSize: 25 }}
						value={this.state.username}
						onChangeText={value => this.handleChange('username', value)}
						saveRecordedText={text => this.handleChange('username', text)}
						label="Username"
					/>
					<Input
						style={{ fontSize: 25 }}
						value={this.state.password}
						onChangeText={value => this.handleChange('password', value)}
						saveRecordedText={text => this.handleChange('password', text)}
						label="New Password"
					/>
					<Input
						style={{ fontSize: 25 }}
						value={this.state.password_confirmation}
						onChangeText={value => this.handleChange('password_confirmation', value)}
						saveRecordedText={text => this.handleChange('password_confirmation', text)}
						label="Password Confirmation"
					/>
					<Input
						style={{ fontSize: 25 }}
						value={this.state.email}
						onChangeText={value => this.handleChange('email', value)}
						saveRecordedText={text => this.handleChange('email', text)}
						label="Email"
					/>
					<Input
						style={{ fontSize: 25 }}
						value={this.state.phone}
						onChangeText={value => this.handleChange('phone', value)}
						saveRecordedText={text => this.handleChange('phone', text)}
						label="Phone Number"
					/>
					{this.props.user.role === 'client' && this.renderClientInfo()}
					{this.props.user.role === 'caretaker' && this.renderCaretakerInfo()}
					<View style={{ height: 150 }}></View>
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = state => ({
	user: state.userAccount,
	profile: state.profile
});

const mapDispatchToProps = dispatch => ({
	loadProfile: profile => dispatch(loadProfile(profile))
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditProfile);

EditProfile.propTypes = {
	userAccount: PropTypes.object
};
