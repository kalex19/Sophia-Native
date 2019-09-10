/**
 * @flow
 */

import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput 
} from 'react-native';
import { TouchableHighlight } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { loadLists } from "../../actions";
import { fetchLists, postList, deleteList, patchList } from "../../Utils/apiCalls";
import { Asset } from 'expo-asset';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Font from 'expo-font';
import * as Permissions from 'expo-permissions';

class Icon {
  constructor(module, width, height) {
    this.module = module;
    this.width = width;
    this.height = height;
    Asset.fromModule(this.module).downloadAsync();
  }
}

const ICON_RECORD_BUTTON = new Icon(require('../../assets/images/record_button.png'), 70, 119);
const ICON_RECORDING = new Icon(require('../../assets/images/record_icon.png'), 20, 14);
const ICON_THUMB_1 = new Icon(require('../../assets/images/thumb_1.png'), 18, 19);
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = '#FFF8ED';
const LIVE_COLOR = '#FF0000';
const DISABLED_OPACITY = 0.5;
const RATE_SCALE = 3.0;

class Lists extends Component {
  constructor(props) {
    super(props);
    this.recording = null;
    this.sound = null;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.state = {
      haveRecordingPermissions: false,
      isLoading: false,
      isPlaybackAllowed: false,
      muted: false,
      soundPosition: null,
      soundDuration: null,
      recordingDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isRecording: false,
      fontLoaded: false,
      shouldCorrectPitch: true,
      volume: 1.0,
      rate: 1.0,
      displayEdit: "",
      list_title: "",
      list_edit_input: ""
    };
    this.recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY));
  }

  componentDidMount = async () => {
    // await this.returnUpdatedList();
    await Font.loadAsync({
        'cutive-mono-regular': require('../../assets/fonts/CutiveMono-Regular.ttf'),
      });
      this.setState({ fontLoaded: true });
      this._askForPermissions();
  };

  _askForPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({
      haveRecordingPermissions: response.status === 'granted',
    });
  };

  _updateScreenForRecordingStatus = status => {
    if (status.canRecord) {
      this.setState({
        isRecording: status.isRecording,
        recordingDuration: status.durationMillis,
      });
    } else if (status.isDoneRecording) {
      this.setState({
        isRecording: false,
        recordingDuration: status.durationMillis,
      });
      if (!this.state.isLoading) {
        this._stopRecordingAndEnablePlayback();
      }
    }
  };

  //updates text - LIVE!

  async _stopPlaybackAndBeginRecording() {
    this.setState({
      isLoading: true,
    });
    if (this.sound !== null) {
      await this.sound.unloadAsync();
      this.sound.setOnPlaybackStatusUpdate(null);
      this.sound = null;
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    if (this.recording !== null) {
      this.recording.setOnRecordingStatusUpdate(null);
      this.recording = null;
    }

    const recording = new Audio.Recording();
    console.log('new recording', recording)
    await recording.prepareToRecordAsync(this.recordingSettings);
    recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);

    this.recording = recording;
    await this.recording.startAsync(); 
    this.setState({
      isLoading: false,
    });
  }

  async _stopRecordingAndEnablePlayback() {
    this.setState({
      isLoading: true,
    });
    try {
      await this.recording.stopAndUnloadAsync();
      console.log(recording.createNewLoadedSoundAsync())
    } catch (error) {
      // Do nothing -- we are already unloaded.
    }
    const info = await FileSystem.getInfoAsync(this.recording.getURI());
    console.log('recording',this.recording)
    console.log(`FILE INFO: ${JSON.stringify(info)}`);
    const response = await fetch(info.uri);
    const blob = await response.blob();
    this.postBlob(blob)
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    const { sound, status } = await this.recording.createNewLoadedSoundAsync(
      {
        isLooping: true,
        isMuted: this.state.muted,
        volume: this.state.volume,
        rate: this.state.rate,
        shouldCorrectPitch: this.state.shouldCorrectPitch,
      },
      this._updateScreenForSoundStatus
    );
    this.sound = sound;
    this.setState({
      isLoading: false,
    });
  }

  postBlob = (blob) => {
    var formData = new FormData(blob);
    formData.append('soundBlob', blob)
    console.log(formData);

    const options = {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      },
    }

    fetch("http://localhost:3000/api/v1/clients", options)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      })
    .catch(error => {
      console.log(error);
      })
  }

  _onRecordPressed = () => {
    if (this.state.isRecording) {
      this._stopRecordingAndEnablePlayback();
    } else {
      this._stopPlaybackAndBeginRecording();
    }
  };

  returnUpdatedList = async () => {
    let userId = this.props.navigation.state.params
    const lists = await fetchLists(userId);
    this.props.loadLists(lists);
  };

  toggleEditName = (list_id) => {
    this.setState({ displayEdit: list_id });
  };

  handleChange = input => {
    this.setState({ list_title: input });
  };

  handleEditList = input => {
    this.setState({ list_edit_input: input });
  };

  handleSubmit = async newList => {
    const { list_title } = this.state;
    let userId = this.props.navigation.state.params
    newList = { name: list_title };
    await postList(newList, userId);
    await this.returnUpdatedList();
    this.setState({ list_title: "" });
  };

  eraseList = async listId => {
    let userId = this.props.navigation.state.params
    await deleteList(userId, listId);
    this.returnUpdatedList();
  };

  handleSubmitEdit = async listId => {
    const { list_edit_input } = this.state;
    let userId = this.props.navigation.state.params
    const modifiedList = { name: list_edit_input };
    await patchList(modifiedList, listId, userId);
    this.returnUpdatedList();
    this.setState({ list_edit_input: "", displayEdit: false });
  };

  render() {
    if(!this.state.fontLoaded) {
      return (
          <View style={styles.emptyContainer} />
      )
  }

  if (!this.state.haveRecordingPermissions){
      return (
          <View style={styles.container}>
              <View />
              <Text style={[styles.noPermissionsText, { fontFamily: 'cutive-mono-regular' }]}>
                You must enable audio recording permissions in order to use this app.
              </Text>
              <View />
          </View>
      )
  }
    let userId = this.props.navigation.state.params
    const { lists } = this.props;
    const { navigation } = this.props;
    const allLists = lists.map(list => {
      list = { ...list, client_id: userId }
      console.log("LIST NAME", list.name)
      return (
        <View style={styles.lists} key={list.id}>
          <TouchableHighlight
            underlayColor="black"
            accessibilityLabel={`Tap me to navigate to your ${list.name} list. From there view or create your tasks.`}
            accessible={true}
          ></TouchableHighlight>
          {this.state.displayEdit !== list.id && (
            <Text
              style={styles.listName}
              onPress={() => {
                navigation.navigate("IndividualList", list);
              }}
            >
              {list.name}
            </Text>
          )}
          {this.state.displayEdit === list.id && (
            <View style={styles.align}>
              <TextInput
                style={styles.input}
                placeholder="New name"
                value={this.state.list_edit_input}
                onChangeText={this.handleEditList}
              ></TextInput>
              <TouchableHighlight
                underlayColor="black"
                accessibilityLabel="Tap me to submit your edited list name."
                accessible={true}
                onPress={() => this.handleSubmitEdit(list.id)}
              >
                <Text style={styles.listItem}>✔︎</Text>
              </TouchableHighlight>
            </View>
          )}
          <View style={styles.vertically}>
            <TouchableHighlight
              underlayColor="black"
              accessibilityLabel="Tap me to open form and edit your list name."
              accessible={true}
              onPress={() => this.toggleEditName(list.id)}
            >
              <Text style={styles.editItem}>✏️</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this.eraseList(list.id)}>
              <Text style={styles.editItem}>DEL</Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    }).reverse();
    return (
      <View>
      <View style={styles.headerContainer}>
          <Text style={styles.header}>My Todo Lists</Text>
        </View>
          <View style={styles.addListContainer}>
            <TextInput
              style={styles.input}
              placeholder="List name"
              value={this.state.list_title}
              onChangeText={this.handleChange}
            ></TextInput>
            <TouchableHighlight
              underlayColor="black"
              accessibilityLabel="Tap me to submit the title of your list."
              accessible={true}
              onPress={() => this.handleSubmit()}
            >
              <Text style={styles.plus}> + </Text>
            </TouchableHighlight>
            </View>
        <View
          style={[
            styles.halfScreenContainer,
            {
              opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0,
            },
          ]}>
          <View style={styles.recordingContainer}>
            <TouchableHighlight
              underlayColor={BACKGROUND_COLOR}
              style={styles.wrapper}
              onPress={this._onRecordPressed}
              disabled={this.state.isLoading}>
              <Text>Record Your List Name</Text>
            </TouchableHighlight>
            <View style={styles.recordingDataContainer}>
              <Text style={[styles.liveText, { fontFamily: 'cutive-mono-regular' }]}>
                {this.state.isRecording ? 'LIVE' : ''}
              </Text>
          </View>
        </View>
      </View>
        <View>{allLists}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    borderColor: "maroon",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
    padding: 10
  },
  header: {
    fontSize: 40,
    fontFamily: "Didot",
    textAlign: "center"
  },
  addListContainer: {
    backgroundColor: "maroon",
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    padding: 5,
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: "space-between"
  },
  lists: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "maroon",
    alignItems: "center",
    margin: 10,
    marginBottom: 1,
    marginTop: 1,
    padding: 10
  },
  listName: {
    color: "white",
    fontSize: 40,
    fontFamily: "Didot"
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 40,
    textAlign: "center",
    backgroundColor: "white",
    width: "85%",
    fontFamily: "Didot",
  },
  align: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // width: "85%",
    borderWidth: 1,
    borderColor: "white"
  },
  plus: {
    fontSize: 50,
    color: "white"
  },
  listItem: {
    fontSize: 25,
    color: "white",
    padding: 5
  },
  editItem: {
    fontSize: 15,
    color: "white",
    fontFamily: "Didot",
  },
  vertically: {
    flexDirection: "column",
    alignItems: "center"
  },
  emptyContainer: {
    alignSelf: 'stretch',
    backgroundColor: BACKGROUND_COLOR,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: BACKGROUND_COLOR,
    minHeight: DEVICE_HEIGHT,
    maxHeight: DEVICE_HEIGHT,
  },
  noPermissionsText: {
    textAlign: 'center',
  },
  wrapper: {},
  halfScreenContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    minHeight: DEVICE_HEIGHT / 2.0,
    maxHeight: DEVICE_HEIGHT / 2.0,
  },
  recordingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    minHeight: ICON_RECORD_BUTTON.height,
    maxHeight: ICON_RECORD_BUTTON.height,
  },
  recordingDataContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: ICON_RECORD_BUTTON.height,
    maxHeight: ICON_RECORD_BUTTON.height,
    minWidth: ICON_RECORD_BUTTON.width * 3.0,
    maxWidth: ICON_RECORD_BUTTON.width * 3.0,
  },
  recordingDataRowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: ICON_RECORDING.height,
    maxHeight: ICON_RECORDING.height,
  },
  playbackContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    minHeight: ICON_THUMB_1.height * 2.0,
    maxHeight: ICON_THUMB_1.height * 2.0,
  },
  liveText: {
    color: LIVE_COLOR,
  },
  image: {
    backgroundColor: BACKGROUND_COLOR,
  },
});

export const mapStateToProps = state => ({
  lists: state.lists
});

export const mapDispatchToProps = dispatch => ({
  loadLists: lists => dispatch(loadLists(lists))
});

export default connect(mapStateToProps, mapDispatchToProps)(Lists)
