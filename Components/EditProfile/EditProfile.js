import React, { Component } from 'react';
import { ScrollView, View} from 'react-native';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import styles from './styles';
import Button from '../common/Button/Button';
import Header from '../common/Header/Header';
import Input from '../common/Input/Input';
import { patchClientProfile } from '../../Utils/clientApiCalls';
import { patchCaretakerProfile } from '../../Utils/caretakerApiCalls';



const initialState = {
name: '',
	username: '',
	password: '',
	email: '',
	phone: '',
	address: '',
	city: '',
	state: '',
	zip: '',
	allergies: [],
	needs: [],
	diet_restrictions:[],
	medications: [],
	abilities: []
};

export class EditProfile extends Component {
	state = initialState;

	componentDidMount(){
		this.setState({
			initialState
		})
	}

	handleChange = (name, value) => {
		const multiResponseInputs = ['needs', 'allergies', 'diet', 'medications', 'abilities'];
		if (multiResponseInputs.includes(name)) {
			value = value.split(', ');
		}
		this.setState({ [name]: value });
	};

	handleSubmitEdit = async () => {
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
						style={styles.userInfo}
						value={this.state.address}
						onChangeText={value => this.handleChange('address', value)}
					/>
				</View>
				<View>
					<Input
						style={styles.userInfo}
						value={this.state.city}
						onChangeText={value => this.handleChange('city', value)}
					/>
				</View>
				<View>
					<Input
						style={styles.userInfo}
						value={this.state.state}
						onChangeText={value => this.handleChange('state', value)}
					/>
				</View>
				<View>
					<Input
						style={styles.userInfo}
						value={this.state.zip}
						onChangeText={value => this.handleChange('zip', value)}
					/>
				</View>
				<View style={styles.infoContainer}>
					<Text style={styles.userInfo}>Needs:</Text>
					<Input
						style={styles.userInfoList}
						key={Math.random()}
						value={this.state.needs}
						onChangeText={value => this.handleChange('needs', value)}
						placeholder="Edit your needs"
					/>
				</View>
				<View style={styles.infoContainer}>
					<Text style={styles.userInfo}>Allergies: </Text>
					<Input
						style={styles.userInfoList}
						key={Math.random()}
						value={this.state.allergies}
						onChangeText={value => this.handleChange('allergies', value)}
						placeholder="Edit your allergies"
					/>
				</View>
				<View style={styles.infoContainer}>
					<Text style={styles.userInfo}>Dietary Restrictions: </Text>
					<Input
						style={styles.userInfoList}
						key={Math.random()}
						value={this.state.diet_restrictions}
						onChangeText={value => this.handleChange('diet_restrictions', value)}
						placeholder="Edit your diet restrictions"
					/>
				</View>
				<View style={styles.infoContainer}>
					<Text style={styles.userInfo}>Medications:</Text>
					<Input
						style={styles.userInfoList}
						key={Math.random()}
						value={this.state.medications}
						onChangeText={value => this.handleChange('medications', value)}
						placeholder="Edit your medications"
					/>
				</View>
			</View>
		);
	};

	renderCaretakerInfo = () => {
		return (
			<View style={styles.infoContainer}>
				<Text style={styles.userInfo}>Abilities:</Text>
				<Input
					style={styles.userInfoList}
					key={Math.random()}
					value={this.state.abilities}
					onChangeText={value => this.handleChange('abilities', value)}
					placeholder="Edit your abilities"
				/>
			</View>
		);
	};

	render() {
		return (
			<View>
				<Header>My Profile</Header>
				<Button accessibilityLabel="Tap me to submit your edited profile." onPress={() => this.handleSubmitEdit()}>
					Save Profile
				</Button>
				<Input style={styles.userInfo} value={this.state.name} onChangeText={value => this.handleChange('name', value)}>
					{this.state.name}
				</Input>
				<ScrollView style={styles.container}>
					<Input
						style={styles.userInfo}
						value={this.state.username}
						onChangeText={value => this.handleChange('username', value)}
					>
						Username: {this.state.username}
					</Input>
					<Input
						style={styles.userInfo}
						value={this.state.password}
						onChangeText={value => this.handleChange('password', value)}
					>
						Password: {this.state.password}
					</Input>
					{/* need to hide password */}
					<Input
						style={styles.userInfo}
						value={this.state.email}
						onChangeText={value => this.handleChange('email', value)}
					>
						Email: {this.state.email}
					</Input>
					<Input
						style={styles.userInfo}
						value={this.state.phone}
						onChangeText={value => this.handleChange('phone', value)}
					>
						Phone Number: {this.state.phone}
					</Input>
					{this.props.user.role === 'client' && this.renderClientInfo()}
					{this.props.user.role === 'caretaker' && this.renderCaretakerInfo()}
					{/* change the logic so both can't show */}
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
