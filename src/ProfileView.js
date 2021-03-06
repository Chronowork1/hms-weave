// @flow
import React, { Fragment, type Node } from 'react'
import MediaQuery from 'react-responsive'
import { withRouter } from 'react-router-dom'

import Button from './Button'
import ProfileAvatar from './ProfileAvatar'
import { CADENCE_LABELS } from './CadenceOption'

const Buttons = ({
  ownProfile,
  firstTimePublish,
  editing,
  location,
  adminButton,
}: {
  ownProfile: boolean,
  firstTimePublish: boolean,
  editing: boolean,
  location: Object,
  adminButton: Node | null,
}) => (
  <Fragment>
    {ownProfile && <Button to="/edit-profile">Edit Profile</Button>}
    {adminButton}
    {!firstTimePublish && !editing && (
      <Button
        className="button next-button"
        to={{ pathname: '/browse', state: location.state }}
      >
        Back to list
      </Button>
    )}
  </Fragment>
)

const ExpectationDisplay = ({
  name,
  value,
}: {
  name: string,
  value: boolean,
}) => {
  const id = name.split().join('-')

  return (
    <div className="expectation">
      <label htmlFor={id} className={!value ? 'grayed-out' : ''}>
        <input id={id} type="checkbox" disabled checked={value} />
        {name}
      </label>
    </div>
  )
}

export type BaseProfileData = {|
  name: string,
  contactEmail: string,
  imageUrl: ?string,

  affiliations: Array<string>,
  clinicalSpecialties: Array<string>,
  professionalInterests: Array<string>,
  partsOfMe: Array<string>,
  activities: Array<string>,
  degrees: Array<string>,

  additionalInformation: string,

  willingShadowing: boolean,
  willingNetworking: boolean,
  willingGoalSetting: boolean,
  willingDiscussPersonal: boolean,
  willingCareerGuidance: boolean,
  willingStudentGroup: boolean,

  cadence: string,
  otherCadence: ?string,
|}

export type ProfileData = {|
  id: string,
  ...BaseProfileData,
|}

const Expectations = ({
  willingShadowing,
  willingNetworking,
  willingGoalSetting,
  willingDiscussPersonal,
  willingCareerGuidance,
  willingStudentGroup,
}: {
  willingShadowing: boolean,
  willingNetworking: boolean,
  willingGoalSetting: boolean,
  willingDiscussPersonal: boolean,
  willingCareerGuidance: boolean,
  willingStudentGroup: boolean,
}) => (
  <Fragment>
    <h4>I am available to help in the following ways:</h4>

    <ExpectationDisplay
      name="Clinical shadowing opportunities"
      value={willingShadowing}
    />

    <ExpectationDisplay name="Networking" value={willingNetworking} />

    <ExpectationDisplay name="Goal setting" value={willingGoalSetting} />

    <ExpectationDisplay
      name="Discussing personal as well as professional life"
      value={willingDiscussPersonal}
    />

    <ExpectationDisplay name="Career guidance" value={willingCareerGuidance} />
    <ExpectationDisplay
      name="Student interest group support or speaking at student events"
      value={willingStudentGroup}
    />
  </Fragment>
)

function displayCadence(cadence: string, otherCadence: ?string) {
  if (cadence === 'other') {
    return otherCadence
  }

  return CADENCE_LABELS[cadence]
}

const Cadence = ({
  cadence,
  otherCadence,
}: {
  cadence: string,
  otherCadence: ?string,
}) => (
  <div style={{ marginTop: '1.2em' }}>
    <h4>Meeting Cadence</h4>
    {displayCadence(cadence, otherCadence)}
  </div>
)

const HospitalAffiliations = ({ affiliations }: { affiliations: string }) => (
  <Fragment>
    <h4>Institutional Affiliations</h4>
    <p style={{ paddingBottom: '1em' }}>{affiliations}</p>
  </Fragment>
)

const AcademicDegrees = ({ degrees }: { degrees: string }) => (
  <Fragment>
    <h4 style={{ marginTop: '2em' }}>Academic Degrees</h4>
    <p style={{ paddingBottom: '1em' }}>{degrees}</p>
  </Fragment>
)

const ClinicalInterests = ({ interests }: { interests: string }) => (
  <div>
    <h4>Clinical Interests</h4>
    <p style={{ paddingBottom: '1em' }}>{interests}</p>
  </div>
)

const AboutInfo = ({
  degrees,
  affiliations,
  clinicalSpecialties,
  professionalInterests,
  partsOfMe,
  additionalInformation,
  activities,
}: Object) => (
  <Fragment>
    {degrees.length > 0 && <AcademicDegrees degrees={degrees.join(', ')} />}

    <HospitalAffiliations affiliations={affiliations.join(', ')} />
    {clinicalSpecialties.length > 0 && (
      <ClinicalInterests interests={clinicalSpecialties.join(', ')} />
    )}
    {professionalInterests.length > 0 && (
      <div>
        <h4>Professional Interests</h4>
        <p style={{ paddingBottom: '1em' }}>
          {professionalInterests.join(', ')}
        </p>
      </div>
    )}
    {partsOfMe.length > 0 && (
      <div>
        <h4>Parts Of Me</h4>
        <p style={{ paddingBottom: '1em' }}>{partsOfMe.join(', ')}</p>
      </div>
    )}
    {activities.length > 0 && (
      <div>
        <h4>Activities I Enjoy</h4>
        <p style={{ paddingBottom: '1em' }}>{activities.join(', ')}</p>
      </div>
    )}
    {additionalInformation && (
      <div>
        <h4>Additional Information</h4>
        <p>{additionalInformation}</p>
      </div>
    )}
  </Fragment>
)

const ContactInformation = ({ contactEmail }: { contactEmail: string }) => {
  const [username, domain] = contactEmail.split('@')
  return (
    <Fragment>
      <h4>Contact Information</h4>

      <a className="contact-email" href={`mailto:${contactEmail}`}>
        {username}
        <wbr />@{domain}
      </a>
    </Fragment>
  )
}

const ProfileView = ({
  data,
  ownProfile = false,
  firstTimePublish = false,
  editing = false,
  isAdmin,
  location,
  profileId,
}: {
  data: BaseProfileData,
  ownProfile?: boolean,
  firstTimePublish?: boolean,
  editing?: boolean,
  isAdmin?: boolean,
  location: Object,
  profileId?: ?string,
}) => {
  const adminButton =
    isAdmin && profileId ? (
      <Button to={`/admin-edit-profile/${profileId}`}>
        Edit profile as admin
      </Button>
    ) : null

  const buttons = (
    <Buttons
      ownProfile={ownProfile}
      firstTimePublish={firstTimePublish}
      editing={editing}
      location={location}
      adminButton={adminButton}
    />
  )
  return (
    <Fragment>
      <MediaQuery query="(max-device-width: 750px)">
        <div className="profile-contact">
          {buttons}

          <ProfileAvatar imageUrl={data.imageUrl} name={data.name} size={200} />

          <h1>{data.name}</h1>

          <ContactInformation contactEmail={data.contactEmail} />

          <Cadence cadence={data.cadence} otherCadence={data.otherCadence} />

          <Expectations
            willingShadowing={data.willingShadowing}
            willingNetworking={data.willingNetworking}
            willingGoalSetting={data.willingGoalSetting}
            willingDiscussPersonal={data.willingDiscussPersonal}
            willingCareerGuidance={data.willingCareerGuidance}
            willingStudentGroup={data.willingStudentGroup}
          />
          <AboutInfo
            degrees={data.degrees}
            affiliations={data.affiliations}
            clinicalSpecialties={data.clinicalSpecialties}
            professionalInterests={data.professionalInterests}
            partsOfMe={data.partsOfMe}
            additionalInformation={data.additionalInformation}
            activities={data.activities}
          />
        </div>
      </MediaQuery>

      <MediaQuery query="(min-device-width: 750px)">
        <div className="profile-contact">
          <div className="columns">
            <div className="column contact">
              <ProfileAvatar
                imageUrl={data.imageUrl}
                name={data.name}
                size={200}
              />

              <ContactInformation contactEmail={data.contactEmail} />

              <Cadence
                cadence={data.cadence}
                otherCadence={data.otherCadence}
              />

              <Expectations
                willingShadowing={data.willingShadowing}
                willingNetworking={data.willingNetworking}
                willingGoalSetting={data.willingGoalSetting}
                willingDiscussPersonal={data.willingDiscussPersonal}
                willingCareerGuidance={data.willingCareerGuidance}
                willingStudentGroup={data.willingStudentGroup}
              />
            </div>
            <div className="about">
              {buttons}

              <h1>{data.name}</h1>

              <AboutInfo
                degrees={data.degrees}
                affiliations={data.affiliations}
                clinicalSpecialties={data.clinicalSpecialties}
                professionalInterests={data.professionalInterests}
                partsOfMe={data.partsOfMe}
                additionalInformation={data.additionalInformation}
                activities={data.activities}
              />
            </div>
          </div>
        </div>
      </MediaQuery>
    </Fragment>
  )
}

export default withRouter(ProfileView)
