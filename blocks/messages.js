const moment = require("moment");

module.exports = {
  app_home: {
    type: "home",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Welcome to *Quote Approvals* :wave:",
        },
      },
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "Resources :books:",
          emoji: true,
        },
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: " ",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            ":point_right: Here is a detailed <https://docs.google.com/document/d/13CHXzCkpyCMfTeWT7SyCkyn0_Nf-csxsL6TYx2BXp4M/edit|guide> on how to use the app",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: " ",
        },
      },
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "Settings :gear:",
          emoji: true,
        },
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: " ",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Approvers* :lock_with_ink_pen:",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Choose the approvers at each level of the discount process",
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Edit",
            emoji: true,
          },
          action_id: "edit_approvers",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Message Content* :envelope_with_arrow:",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "Edit the details in the `Proposed Structure` part of the message that is sent to the new channel",
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Edit",
            emoji: true,
          },
          action_id: "edit_proposed_structure",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: " ",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "Edit the details in the `Quote Lines` part of the message that is sent to the new channel",
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Edit",
            emoji: true,
          },
          action_id: "edit_quote_lines",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: " ",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Modals* :white_square_button:",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "Edit the description of each approver that is shown in `Approver Details`",
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Edit",
            emoji: true,
          },
          action_id: "edit_approver_details",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: " ",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "Edit the description of each approver that is shown in `Quote Line Details`",
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Edit",
            emoji: true,
          },
          action_id: "edit_quote_line_details",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: " ",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "Edit the description of each approver that is shown in `Deal Stats`",
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Edit",
            emoji: true,
          },
          action_id: "edit_deal_stats",
        },
      },
    ],
  },
  channel_created: ({ companyName, channelId }) => [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `Awesome! :tada: You just *started a discount approval process* for ${companyName}. You can watch it play out here :point_right: <#${channelId}>`,
      },
    },
  ],
  channel_exists: ({ companyName, channelId }) => [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `Oops! :open_mouth: It looks like a discount approval has *already been requested* for ${companyName}. You can check it out in this channel here :point_right: <#${channelId}>`,
      },
    },
  ],
  discount_approved: (companyName) => [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `Your discount for ${companyName} was approved! :white_check_mark:`,
      },
    },
  ],
  discount_mention: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text:
          ":eyes: It sounds like you're considering a discount. Would you like to start the *discount approval process*?",
      },
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Let's get started! :rocket:",
            emoji: true,
          },
          style: "primary",
          action_id: "launch_discount",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Nope!",
            emoji: true,
          },
          action_id: "cancel_ephemeral",
        },
      ],
    },
  ],
  channel_message: ({
    user,
    companyName,
    justification,
    discount,
    status,
    user_settings_obj,
  }) => [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `<@${user}> is requesting approval for *${companyName}*`,
      },
      accessory: {
        type: "image",
        image_url: "https://quote-approvals.s3.amazonaws.com/salesforce_1.png",
        alt_text: "salesforce",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: ":+1: *Approvals Required:*",
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `${status > 0 ? ":l1_complete:" : ":l1:"} > ${
          status > 1 ? ":l2_complete:" : ":l2:"
        } > ${status > 2 ? ":sales_ops_complete:" : ":sales_ops:"} > ${
          status > 3 ? ":legal_complete:" : ":legal:"
        }`,
      },
      accessory: {
        type: "button",
        text: {
          type: "plain_text",
          text: "Details",
          emoji: true,
        },
        action_id: "status_details",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: ":handshake: *Proposed Structure*",
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: "*Close Date:*",
        },
        {
          type: "plain_text",
          text: user_settings_obj.proposed_structure.close_date,
        },
        {
          type: "mrkdwn",
          text: "*ACV (Churn):*",
        },
        {
          type: "plain_text",
          text: user_settings_obj.proposed_structure.acv_churn,
        },
        {
          type: "mrkdwn",
          text: "*Billings:*",
        },
        {
          type: "plain_text",
          text: user_settings_obj.proposed_structure.billings,
        },
        {
          type: "mrkdwn",
          text: "*Total Contract Value (TCV):*",
        },
        {
          type: "plain_text",
          text: user_settings_obj.proposed_structure.tcv,
        },
        {
          type: "mrkdwn",
          text: "*Subscription Term:*",
        },
        {
          type: "plain_text",
          text: user_settings_obj.proposed_structure.subscription_term,
        },
      ],
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: "*Max Discount:*",
        },
        {
          type: "mrkdwn",
          text: `${discount}%`,
        },
        {
          type: "mrkdwn",
          text: "*Payment Terms:*",
        },
        {
          type: "plain_text",
          text: user_settings_obj.proposed_structure.payment_terms,
        },
        {
          type: "mrkdwn",
          text: "*Payment Frequency:*",
        },
        {
          type: "plain_text",
          text: user_settings_obj.proposed_structure.payment_frequency,
        },
      ],
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: " ",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: ":ok_hand: *Asks & Justification:*",
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `${justification}`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: " ",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: ":writing_hand: *Quote Lines:*",
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${user_settings_obj.quote_lines.licenses}* x licenses with \`${discount}%\` discount`,
      },
      accessory: {
        type: "button",
        text: {
          type: "plain_text",
          text: "Details",
          emoji: true,
        },
        action_id: "quote_lines_details",
      },
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Deal Stats",
            emoji: true,
          },
          action_id: "deal_stats",
        },
      ],
    },
  ],
  redirect_home: ({ workspace_id, app_id }) => [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Uh oh! :grimacing: We seem to be missing some *approvers*...",
      },
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Configure Approvers :gear:",
            emoji: true,
          },
          action_id: "take_me_home",
          url: `slack://app?team=${workspace_id}&id=${app_id}&tab=home`,
        },
      ],
    },
  ],
  thread_approved: ({ approver, approval_level }) => [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `:white_check_mark: <@${approver}> approved \`${approval_level}\`.`,
      },
    },
  ],
  thread_ask: ({ approver, approval_type }) => [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `:wave: Hello <@${approver}> - please submit your \`${approval_type}\` approval`,
      },
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            emoji: true,
            text: "Approve",
          },
          style: "primary",
          action_id: "approve",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            emoji: true,
            text: "Reject",
          },
          style: "danger",
          action_id: "reject",
        },
      ],
    },
  ],
  thread_error: ({ user, action }) => [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `:cry: Sorry <@${user}> - you do not have the authority to *${action}* this request`,
      },
    },
  ],
};
