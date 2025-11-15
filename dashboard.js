import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

// Dummy family and activity data
const family = [
  { name: 'Alex', role: 'Teen', balance: 245.5, saved: 180, avatar: '🙂' },
  { name: 'Emma', role: 'Teen', balance: 156.75, saved: 120, avatar: '😊' },
];

const activities = [
  { label: 'Weekly Allowance', amount: '+$25.00', type: 'add', time: 'Today' },
  { label: 'Coffee Shop', amount: '$4.50', type: 'remove', time: 'Yesterday' },
  { label: 'Savings Goal', amount: '$10.00', type: 'neutral', time: '2 days ago' },
  { label: 'Movie Tickets', amount: '$12.00', type: 'remove', time: '3 days ago' },
];

const goals = [
  { label: 'New Laptop', progress: 350, total: 800, color: '#297AF8' },
  { label: 'Summer Trip', progress: 180, total: 500, color: '#22bb6e' },
  { label: 'Emergency Fund', progress: 120, total: 300, color: '#a067e6' },
];

// Tabs definition
const tabs = ['Overview', 'Transactions', 'Goals'];

export default function DashboardScreen() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <View style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.tabsRow}>
        {tabs.map(tab => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
            <Text style={activeTab === tab ? styles.tabActive : styles.tabDefault}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={{ flex: 1 }}>
        {activeTab === 'Overview' && (
          <>
            {/* Balance Card */}
            <View style={styles.balanceCard}>
              <Text style={styles.balanceTitle}>Total Family Balance</Text>
              <Text style={styles.balanceAmount}>$1,247.25</Text>
              <View style={styles.balanceRow}>
                <Text style={styles.balanceSub}>This Month{'\n'}<Text style={{ color: '#fff' }}>+$145.50</Text></Text>
                <Text style={styles.balanceSub}>Savings Rate{'\n'}<Text style={{ color: '#fff' }}>23%</Text></Text>
              </View>
            </View>

            {/* Family Members */}
            <Text style={styles.sectionTitle}>Family Members</Text>
            {family.map((member, i) => (
              <View style={styles.memberCard} key={i}>
                <Text style={styles.avatar}>{member.avatar}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <Text style={styles.memberRole}>{member.role}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.memberBalance}>${member.balance}</Text>
                  <Text style={styles.memberSaved}>+${member.saved} saved</Text>
                </View>
              </View>
            ))}

            {/* Quick Actions */}
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickRow}>
              <View style={styles.quickAction}>
                <Text style={styles.quickIcon}>💸</Text>
                <Text style={styles.quickTitle}>Send Money</Text>
                <Text style={styles.quickDesc}>Transfer to family</Text>
              </View>
              <View style={styles.quickAction}>
                <Text style={styles.quickIcon}>🎯</Text>
                <Text style={styles.quickTitle}>Set Goal</Text>
                <Text style={styles.quickDesc}>Create savings goal</Text>
              </View>
            </View>
          </>
        )}
        {activeTab === 'Transactions' && (
          <>
            <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Recent Activity</Text>
            {activities.map((act, i) => (
              <View style={styles.activityCard} key={i}>
                <Text style={{
                  fontSize: 20,
                  color: act.type === 'add' ? '#22bb6e' : act.type === 'remove' ? '#FA6363' : '#297AF8',
                  marginRight: 12,
                }}>
                  {act.type === 'add' ? '⬇️' : act.type === 'remove' ? '⬆️' : '⭕'}
                </Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.activityLabel}>{act.label}</Text>
                  <Text style={styles.activityTime}>{act.time}</Text>
                </View>
                <Text style={[styles.activityAmount, {
                  color: act.type === 'add' ? '#22bb6e' : '#222',
                  fontWeight: act.type === 'add' ? 'bold' : 'normal'
                }]}>
                  {act.amount}
                </Text>
              </View>
            ))}
          </>
        )}
        {activeTab === 'Goals' && (
          <>
            <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Savings Goals</Text>
            <TouchableOpacity style={styles.newGoal}><Text style={{ color: '#FA6363', fontWeight: 'bold' }}>+ New Goal</Text></TouchableOpacity>
            {goals.map((goal, i) => (
              <View style={styles.goalCard} key={i}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ fontWeight: 'bold', color: '#222', fontSize: 15 }}>{goal.label}</Text>
                  <Text style={{ fontWeight: 'bold', color: '#222' }}>${goal.progress} / ${goal.total}</Text>
                </View>
                <View style={styles.goalBarBackground}>
                  <View style={[styles.goalBar, {
                    backgroundColor: goal.color,
                    width: ${(goal.progress / goal.total) * 100}%
                  }]} />
                </View>
                <Text style={styles.goalPercent}>{Math.round(100 * goal.progress / goal.total)}% complete</Text>
              </View>
            ))}
          </>
        )}
      </ScrollView>
      {/* Footer tab bar mimic */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}><Text style={styles.tabLabel}>Home</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}><Text style={styles.tabLabel}>Features</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}><Text style={styles.tabLabel}>Reviews</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}><Text style={styles.tabLabelActive}>Dashboard</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 18, paddingHorizontal: 14 },
  tabsRow: { flexDirection: 'row', justifyContent: 'flex-start', gap: 38, marginBottom: 2 },
  tabDefault: { fontSize: 16, color: '#888', paddingVertical: 8, marginRight: 18 },
  tabActive: { fontSize: 16, color: '#FA6363', borderBottomWidth: 2, borderColor: '#FA6363', paddingVertical: 7, marginRight: 18 },
  balanceCard: { backgroundColor: 'linear-gradient(90deg, #FF8008, #FFA94D)', borderRadius: 22, padding: 18, marginVertical: 18 },
  balanceTitle: { color: '#fff', fontWeight: '600', fontSize: 15, marginBottom: 7 },
  balanceAmount: { color: '#fff', fontSize: 29, fontWeight: 'bold', marginBottom: 7 },
  balanceRow: { flexDirection: 'row', justifyContent: 'space-between' },
  balanceSub: { color: '#fff', fontSize: 13 },
  sectionTitle: { fontWeight: 'bold', fontSize: 17, color: '#222', marginTop: 14, marginBottom: 7 },
  memberCard: { backgroundColor: '#fff', borderRadius: 13, padding: 12, marginVertical: 5, flexDirection: 'row', alignItems: 'center', shadowColor: '#aaa', shadowOpacity: 0.12, elevation: 1 },
  avatar: { fontSize: 32, marginRight: 12 },
  memberName: { fontWeight: 'bold', color: '#222', fontSize: 15 },
  memberRole: { color: '#888', fontSize: 13 },
  memberBalance: { color: '#222', fontWeight: 'bold', fontSize: 16 },
  memberSaved: { color: '#22bb6e', fontSize: 13, marginTop: 2 },
  quickRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 12 },
  quickAction: { backgroundColor: '#f4f6fa', flex: 1, borderRadius: 13, alignItems: 'center', padding: 14, margin: 5, elevation: 1 },
  quickIcon: { fontSize: 25, marginBottom: 7 },
  quickTitle: { fontWeight: 'bold', color: '#222', fontSize: 14 },
  quickDesc: { color: '#888', fontSize: 12 },
  activityCard: { flexDirection: 'row', alignItems: 'center', padding: 14, backgroundColor: '#f4f6fa', borderRadius: 12, marginBottom: 11 },
  activityLabel: { fontWeight: 'bold', color: '#222', fontSize: 15 },
  activityTime: { color: '#aaa', fontSize: 12 },
  activityAmount: { fontWeight: 'bold', fontSize: 15 },
  newGoal: { alignSelf: 'flex-end', marginBottom: 6, marginTop: -6, },
  goalCard: { backgroundColor: '#f4f6fa', borderRadius: 12, padding: 15, marginVertical: 7 },
  goalBarBackground: { height: 8, backgroundColor: '#ddd', borderRadius: 6, marginTop: 7, marginBottom: 2, overflow: 'hidden' },
  goalBar: { height: 8, borderRadius: 6 },
  goalPercent: { fontSize: 12, color: '#888', marginTop: 2 },
  tabBar: {
    backgroundColor: '#f4f6fa', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    position: 'absolute', bottom: 0, left: 0, right: 0, height: 62, paddingHorizontal: 12, borderTopLeftRadius: 22, borderTopRightRadius: 22
  },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  tabLabel: { color: '#bdbdbd', fontSize: 13, marginTop: 3 },
  tabLabelActive: { color: '#FA6363', fontWeight: '700', fontSize: 13, marginTop: 3 },
});
