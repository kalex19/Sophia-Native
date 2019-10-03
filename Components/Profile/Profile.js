import React, { Component } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import styles from './styles';
import Button from '../common/Button/Button';
import Header from '../common/Header/Header';
import { patchClientProfile } from '../../Utils/clientApiCalls';
import { patchCaretakerProfile } from '../../Utils/caretakerApiCalls';
import clientImage from '../../assets/stockFace.jpg';
import caretakerImage from '../../assets/stockMan.jpg';
import theme from '../../theme';

const initialState = {
	username: '',
	password: '',
	street_address: '',
	city: '',
	state: '',
	zip: '',
	allergies: '',
	needs: '',
	diet_restrictions: '',
	medications: '',
	abilities: '',
	displayEdit: false
};

export class Profile extends Component {
	state = initialState;


	renderClientInfo = () => {
		let allNeeds = this.props.user.needs.map(need => {
			return (
				<Text style={styles.userInfo} key={Math.random()}>
					{need}
				</Text>
			);
		});
		let allMedications = this.props.user.medications.map(med => {
			return (
				<Text style={styles.userInfo} key={Math.random()}>
					{med}
				</Text>
			);
		});
		let allAllergies = this.props.user.allergies.map(allergy => {
			return (
				<Text style={styles.userInfo} key={Math.random()}>
					{allergy}
				</Text>
			);
		});
		let allRestrictions = this.props.user.diet_restrictions.map(restr => {
			return (
				<Text style={styles.userInfo} key={Math.random()}>
					{restr}
				</Text>
			);
		});
		return (
			<View>
				<View style={styles.addressContainer}>
					<Text style={styles.userInfo}>Address:</Text>
					<Text style={styles.userInfo}>{this.props.user.street_address}</Text>
					<Text style={styles.userInfo}>
						{this.props.user.city}, {this.props.user.state} {this.props.user.zip}
					</Text>
				</View>
				<View style={styles.infoContainer}>
					<Text style={styles.userInfo}>Needs:</Text>
					{allNeeds}
				</View>
				<View style={styles.infoContainer}>
					<Text style={styles.userInfo}>Allergies: </Text>
					{allAllergies}
				</View>
				<View style={styles.infoContainer}>
					<Text style={styles.userInfo}>Dietary Restrictions: </Text>
					{allRestrictions}
				</View>
				<View style={styles.infoContainer}>
					<Text style={styles.userInfo}>Medications:</Text>
					{allMedications}
				</View>
			</View>
		);
	};

	renderCaretakerInfo = () => {
		let allAbilities = this.props.user.abilities.map(ability => {
			return (
				<Text style={styles.userInfo} key={Math.random()}>
					{ability}
				</Text>
			);
		});
		return (
			<View style={styles.infoContainer}>
				<Text style={styles.userInfo}>Abilities:</Text>
				{allAbilities}
			</View>
		);
	};

	render() {
		const { navigation } = this.props;
		return (
			<View style={theme.container}>
				<Header>My Profile</Header>
				<ScrollView style={styles.scrollContainer}>
					<Image source={this.props.user.role === 'client' ? clientImage : caretakerImage} style={styles.image}></Image>
					<Text style={styles.userInfoHeader}> {this.props.user.name}</Text>
					<Button accessibilityLabel="Tap me to edit your profile." onPress={() => navigation.navigate('EditProfile')}>
						Edit Profile
					</Button>
					<Text style={styles.userInfo}>Username: {this.props.user.username}</Text>
					<Text style={styles.userInfo}>Email: {this.props.user.email}</Text>
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
)(Profile);

Profile.propTypes = {
	userAccount: PropTypes.object
};
