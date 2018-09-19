import addressData from '../common/shippingAddress'

export async function addPhoneToApplePayIfRequired(phone = '+375296667788') {
  try {
    await this.waitForVisible('PHONE NUMBER REQUIRED', 30000)
    this.t.pass('User should see a warning "PHONE NUMBER REQUIRED"')
  } catch (e) {
    // phone is already added to Apple Pay
    return
  }

  await this.clickUntilVisible('PHONE NUMBER REQUIRED')
  await this.waitForClick('Add Phone Number', 10000)
  await this.setValue('Select a phone number', phone)
  this.t.pass('User should fill phone number')

  await this.clickUntilVisible('Done')
  this.t.pass('User should tap Done button')

  await this.clickUntilVisible('Back')
  this.t.pass('User should tap Back button')
}

const fullName = addressData[0].value.split(' ')
const defaultAddress = {
  firstName: fullName[0],
  lastName: fullName[1],
  street: addressData[1].value,
  city: addressData[2].value,
  state: addressData[3].value,
  zip: addressData[4].value,
}

export async function addShippingAddressToApplePayIfRequired(shippingAddress = defaultAddress) {
  const { firstName, lastName, street, city, state, zip } = shippingAddress

  try {
    await this.waitForVisible('SHIPPING ADDRESS REQUIRED', 30000)
  } catch (e) {
    // shipping address is already added to Apple Pay
    return
  }

  await this.clickUntilVisible('SHIPPING ADDRESS REQUIRED')
  await this.clickUntilVisible('Add Shipping Address')
  await this.clickUntilVisible('Enter Address Manually')

  const fields = [
    ['First Name', firstName],
    ['Last Name', lastName],
    ['Street', street],
    ['City', city],
    ['State', state],
    ['ZIP', zip],
  ]

  for (const [field, value] of fields) {
    await this.setValue(field, value)
  }

  await this.clickUntilVisible('Done')
  await this.clickUntilVisible('Back')
}
