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
						label="Address"
					>
					</Input>
				</View>
				<View>
					<Input
						style={{ fontSize: 25 }}
						value={this.state.city}
						onChangeText={value => this.handleChange('city', value)}
						label="City"
					>
					</Input>
				</View>
				<View>
					<Input
						style={{ fontSize: 25 }}
						value={this.state.state}
						onChangeText={value => this.handleChange('state', value)}
						label="State"
					>
					</Input>
				</View>
				<View>
					<Input
						style={{ fontSize: 25 }}
						value={this.state.zip}
						onChangeText={value => this.handleChange('zip', value)}
						saveRecordedText={text => this.handleChange('zip', text)}
						label="Zip Code"
					>
					</Input>
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
					>
					</Input>
					<Input
						style={{ fontSize: 25 }}
						value={this.state.username}
						onChangeText={value => this.handleChange('username', value)}
						saveRecordedText={text => this.handleChange('username', text)}
						label="Username"
					>
					</Input>
					<Input
						style={{ fontSize: 25 }}
						value={this.state.password}
						onChangeText={value => this.handleChange('password', value)}
						saveRecordedText={text => this.handleChange('password', text)}
						label="Password"
					>
					</Input>
					<Input
						style={{ fontSize: 25 }}
						value={this.state.password_confirmation}
						onChangeText={value => this.handleChange('password_confirmation', value)}
						saveRecordedText={text => this.handleChange('password_confirmation', text)}
						label="Password Confirmation"
					>
					</Input>
					<Input
						style={{ fontSize: 25 }}
						value={this.state.email}
						onChangeText={value => this.handleChange('email', value)}
						saveRecordedText={text => this.handleChange('email', text)}
						label="Email"
					>
					</Input>
					<Input
						style={{ fontSize: 25 }}
						value={this.state.phone}
						onChangeText={value => this.handleChange('phone', value)}
						saveRecordedText={text => this.handleChange('phone', text)}
						label="Phone Number"
					>
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
