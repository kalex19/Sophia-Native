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

const initialState = {
	name: '',
	username: '',
	password: '',
	password_confirmation: '',
	email: '',
	phone: '',
	address: '',
	city: '',
	state: '',
	zip: '',
	allergies: [],
	needs: [],
	diet_restrictions: [],
	medications: [],
	abilities: []
};

export class EditProfile extends Component {
	state = initialState;

	componentDidMount() {
		this.setState({
			initialState
		});
	}

	handleChange = (name, value) => {
		const multiResponseInputs = ['needs', 'allergies', 'diet', 'medications', 'abilities'];
		if (multiResponseInputs.includes(name)) {
			value = value.split(', ');
		}
		this.setState({ [name]: value });
	};

	handleSubmitEdit = async () => {
		const { user } = this.props;
		if (this.props.user.role === 'client') {
			const updatedProfile = {
				username: this.state.username,
				password: this.state.password,
				name: this.state.name,
				email: this.state.email,
				phone: this.state.phone,
				street_address: this.state.address,
				city: this.state.city,
				state: this.state.state,
				zip: this.state.zip,
				allergies: this.state.allergies,
				needs: this.state.needs,
				diet_restrictions: this.state.diet_restrictions,
				medications: this.state.medications,
				client_id: user.id
			};
			await patchClientProfile(updatedProfile);
		} else {
			const updatedProfile = {
				username: this.state.username,
				password: this.state.password,
				name: this.state.name,
				email: this.state.email,
				phone: this.state.phone,
				abilities: this.state.abilities,
				caretaker_id: user.id
			};
			await patchCaretakerProfile(updatedProfile);
		}
		this.props.navigation.navigate('Profile');
	};

	renderClientInfo = () => {
		return (
			<View>
				<View>
					<Input
						style={{ fontSize: 25 }}
						value={this.state.address}
						onChangeText={value => this.handleChange('address', value)}
					>
						Address: {this.state.address}
					</Input>
				</View>
				<View>
					<Input
						style={{ fontSize: 25 }}
						value={this.state.city}
						onChangeText={value => this.handleChange('city', value)}
					>
						City: {this.state.city}
					</Input>
				</View>
				<View>
					<Input
						style={{ fontSize: 25 }}
						value={this.state.state}
						onChangeText={value => this.handleChange('state', value)}
					>
						State: {this.state.state}
					</Input>
				</View>
				<View>
					<Input
						style={{ fontSize: 25 }}
						value={this.state.zip}
						onChangeText={value => this.handleChange('zip', value)}
						saveRecordedText={text => this.handleChange('zip', text)}
					>
						Zip Code: {this.state.zip}
					</Input>
				</View>
				<View style={styles.infoContainer}>
					<Text style={styles.text}>Needs:</Text>
					<Input
						style={{ fontSize: 20 }}
						key={Math.random()}
						value={this.state.needs}
						onChangeText={value => this.handleChange('needs', value)}
						placeholder="Edit your needs"
						saveRecordedText={text => this.handleChange('needs', text)}
					/>
				</View>
				<View style={styles.infoContainer}>
					<Text style={styles.text}>Allergies: </Text>
					<Input
						style={{ fontSize: 20 }}
						key={Math.random()}
						value={this.state.allergies}
						onChangeText={value => this.handleChange('allergies', value)}
						placeholder="Edit your allergies"
						saveRecordedText={text => this.handleChange('allergies', text)}
					/>
				</View>
				<View style={styles.infoContainer}>
					<Text style={styles.text}>Dietary Restrictions: </Text>
					<Input
						style={{ fontSize: 20 }}
						key={Math.random()}
						value={this.state.diet_restrictions}
						onChangeText={value => this.handleChange('diet_restrictions', value)}
						placeholder="Edit your diet restrictions"
						saveRecordedText={text => this.handleChange('diet_restrictions', text)}
					/>
				</View>
				<View style={styles.infoContainer}>
					<Text style={styles.text}>Medications:</Text>
					<Input
						style={{ fontSize: 20 }}
						key={Math.random()}
						value={this.state.medications}
						onChangeText={value => this.handleChange('medications', value)}
						placeholder="Edit your medications"
						saveRecordedText={text => this.handleChange('medications', text)}
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
					placeholder="Edit your abilities"
					saveRecordedText={text => this.handleChange('abilities', text)}
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
					>
						Name: {this.state.name}
					</Input>
					<Input
						style={{ fontSize: 25 }}
						value={this.state.username}
						onChangeText={value => this.handleChange('username', value)}
						saveRecordedText={text => this.handleChange('username', text)}
					>
						Username: {this.state.username}
					</Input>
					<Input
						style={{ fontSize: 25 }}
						value={this.state.password}
						onChangeText={value => this.handleChange('password', value)}
						saveRecordedText={text => this.handleChange('password', text)}
					>
						Password: {this.state.password}
					</Input>
					<Input
						style={{ fontSize: 25 }}
						value={this.state.password_confirmation}
						onChangeText={value => this.handleChange('password_confirmation', value)}
						saveRecordedText={text => this.handleChange('password_confirmation', text)}
					>
						Password Confirmation: {this.state.password}
					</Input>
					<Input
						style={{ fontSize: 25 }}
						value={this.state.email}
						onChangeText={value => this.handleChange('email', value)}
						saveRecordedText={text => this.handleChange('email', text)}
					>
						Email: {this.state.email}
					</Input>
					<Input
						style={{ fontSize: 25 }}
						value={this.state.phone}
						onChangeText={value => this.handleChange('phone', value)}
						saveRecordedText={text => this.handleChange('phone', text)}
					>
						Phone Number: {this.state.phone}
					</Input>
					{this.props.user.role === 'client' && this.renderClientInfo()}
					{this.props.user.role === 'caretaker' && this.renderCaretakerInfo()}
					<View style={{ height: 150 }}></View>
				</ScrollView>
			</View>
		);
	}
}
const mapStateToProps = state => ({
	user: state.userAccount
});

const mapDispatchToProps = dispatch => ({});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditProfile);

EditProfile.propTypes = {
	userAccount: PropTypes.object
};
